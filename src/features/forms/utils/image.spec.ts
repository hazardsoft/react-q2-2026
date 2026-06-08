import { describe, expect, it } from 'vitest';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, fileToBase64 } from './image';

describe('image utils', () => {
  it('exposes the accepted types and size limit', () => {
    expect(ACCEPTED_IMAGE_TYPES).toContain('image/png');
    expect(ACCEPTED_IMAGE_TYPES).toContain('image/jpeg');
    expect(MAX_IMAGE_SIZE).toBeGreaterThan(0);
  });

  it('converts a file to a base64 data URL', async () => {
    const file = new File(['hello'], 'avatar.png', { type: 'image/png' });

    const result = await fileToBase64(file);

    expect(result.startsWith('data:image/png;base64,')).toBe(true);
    expect(result.length).toBeGreaterThan('data:image/png;base64,'.length);
  });
});
