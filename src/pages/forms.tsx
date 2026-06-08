import { useState } from 'react';
import './forms.css';
import Modal from '../features/forms/modal/modal';
import SubmissionsList from '../features/forms/submissions/submissions-list';
import UncontrolledForm from '../features/forms/uncontrolled-form';
import RhfForm from '../features/forms/rhf-form';

type FormKind = 'uncontrolled' | 'rhf';

const FORM_TITLES: Record<FormKind, string> = {
  uncontrolled: 'Uncontrolled Form',
  rhf: 'React Hook Form',
};

const FormsPage = () => {
  const [openForm, setOpenForm] = useState<FormKind | null>(null);

  const closeModal = () => setOpenForm(null);

  return (
    <div id="forms">
      <h1>Forms</h1>
      {/* <p className="forms-intro">
        Open a form in an accessible modal and submit it to add a card below.
      </p> */}

      <div className="form-triggers">
        <button type="button" onClick={() => setOpenForm('uncontrolled')}>
          Uncontrolled Form
        </button>
        <button type="button" onClick={() => setOpenForm('rhf')}>
          React Hook Form
        </button>
      </div>

      <Modal
        isOpen={openForm !== null}
        onClose={closeModal}
        title={openForm ? FORM_TITLES[openForm] : ''}
      >
        {openForm === 'uncontrolled' && (
          <UncontrolledForm onSubmit={closeModal} />
        )}
        {openForm === 'rhf' && <RhfForm onSubmit={closeModal} />}
      </Modal>

      <SubmissionsList />
    </div>
  );
};

export default FormsPage;
