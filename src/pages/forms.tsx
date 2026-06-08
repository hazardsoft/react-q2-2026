import { useState } from 'react';
import './forms.css';
import Modal from '../features/forms/modal/modal';
import SubmissionsList from '../features/forms/submissions/submissions-list';
import UncontrolledForm from '../features/forms/uncontrolled-form';
import RhfForm from '../features/forms/rhf-form';
import { useFormsStore } from '../features/forms/store/forms-store';
import type { FormValues } from '../features/forms/types';

type FormKind = 'uncontrolled' | 'rhf';

const FORM_TITLES: Record<FormKind, string> = {
  uncontrolled: 'Uncontrolled Form',
  rhf: 'React Hook Form',
};

const FormsPage = () => {
  const [openForm, setOpenForm] = useState<FormKind | null>(null);
  const addSubmission = useFormsStore((state) => state.addSubmission);

  const closeModal = () => setOpenForm(null);

  const handleSubmit = (values: FormValues, source: FormKind) => {
    addSubmission({
      source,
      name: values.name,
      age: values.age,
      email: values.email,
      gender: values.gender,
      country: values.country,
      acceptedTerms: values.acceptTerms,
      image: values.image,
    });
    closeModal();
  };

  return (
    <div id="forms">
      <h1>Forms</h1>

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
          <UncontrolledForm
            onSubmit={(values) => handleSubmit(values, 'uncontrolled')}
          />
        )}
        {openForm === 'rhf' && (
          <RhfForm onSubmit={(values) => handleSubmit(values, 'rhf')} />
        )}
      </Modal>

      <SubmissionsList />
    </div>
  );
};

export default FormsPage;
