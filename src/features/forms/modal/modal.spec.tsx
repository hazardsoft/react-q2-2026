import { render, screen } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import Modal from './modal';

const ModalHarness = ({ onClose }: { onClose?: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        title="Test Modal"
      >
        <label htmlFor="field">Field</label>
        <input id="field" />
        <button type="button">Submit</button>
      </Modal>
    </>
  );
};

const setup = (): { user: UserEvent } => ({ user: userEvent.setup() });

describe('Modal: Rendering', () => {
  it('Renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden">
        <p>content</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Renders the title and children when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Visible">
        <p>content</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Visible' })
    ).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('Renders through a portal directly under document.body', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Portaled">
        <p>content</p>
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    expect(overlay).toHaveClass('modal-overlay');
    expect(overlay?.parentElement).toBe(document.body);
  });
});

describe('Modal: Closing', () => {
  it('Closes when the Escape key is pressed', async () => {
    const { user } = setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Test">
        <p>content</p>
      </Modal>
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Closes when clicking the overlay (outside the dialog)', async () => {
    const { user } = setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Test">
        <p>content</p>
      </Modal>
    );

    await user.click(screen.getByRole('dialog').parentElement as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Does not close when clicking inside the dialog', async () => {
    const { user } = setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Test">
        <p>content</p>
      </Modal>
    );

    await user.click(screen.getByText('content'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('Closes when the close button is clicked', async () => {
    const { user } = setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Test">
        <p>content</p>
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: '×' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Modal: Focus management', () => {
  it('Moves focus into the dialog when opened', async () => {
    const { user } = setup();
    render(<ModalHarness />);

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('dialog')).toHaveFocus();
  });

  it('Returns focus to the trigger when closed', async () => {
    const { user } = setup();
    render(<ModalHarness />);

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.keyboard('{Escape}');

    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus();
  });

  it('Traps Tab focus inside the dialog (wraps from last to first)', async () => {
    const { user } = setup();
    render(<ModalHarness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    screen.getByRole('button', { name: 'Submit' }).focus();
    await user.tab();

    expect(screen.getByRole('button', { name: '×' })).toHaveFocus();
  });

  it('Traps Shift+Tab focus inside the dialog (wraps from first to last)', async () => {
    const { user } = setup();
    render(<ModalHarness />);
    await user.click(screen.getByRole('button', { name: 'Open' }));

    screen.getByRole('button', { name: '×' }).focus();
    await user.tab({ shift: true });

    expect(screen.getByRole('button', { name: 'Submit' })).toHaveFocus();
  });
});
