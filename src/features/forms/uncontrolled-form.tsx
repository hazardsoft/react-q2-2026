import type { FormEvent } from 'react';
import './form.css';
import type { FormValues } from './types';

type UncontrolledFormProps = {
  onSubmit: (values: FormValues) => void;
};

const UncontrolledForm = ({ onSubmit }: UncontrolledFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      name: String(data.get('name') ?? '').trim(),
      age: Number(data.get('age')),
      email: String(data.get('email') ?? '').trim(),
      gender: String(data.get('gender') ?? ''),
      acceptTerms: data.get('acceptTerms') === 'on',
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
      </div>

      <div className="field">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" min="0" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </div>

      <fieldset className="field radio-group">
        <legend>Gender</legend>
        <div className="radio-options">
          <div className="radio">
            <input id="gender-male" name="gender" type="radio" value="male" />
            <label htmlFor="gender-male">Male</label>
          </div>
          <div className="radio">
            <input
              id="gender-female"
              name="gender"
              type="radio"
              value="female"
            />
            <label htmlFor="gender-female">Female</label>
          </div>
        </div>
      </fieldset>

      <div className="checkbox-field">
        <input id="terms" name="acceptTerms" type="checkbox" />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
