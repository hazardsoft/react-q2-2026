import { useForm } from 'react-hook-form';
import './form.css';
import type { FormValues } from './types';

type RhfFormProps = {
  onSubmit: (values: FormValues) => void;
};

const RhfForm = ({ onSubmit }: RhfFormProps) => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="rhf-name">Name</label>
        <input id="rhf-name" type="text" {...register('name')} />
      </div>

      <div className="field">
        <label htmlFor="rhf-age">Age</label>
        <input
          id="rhf-age"
          type="number"
          min="0"
          {...register('age', { valueAsNumber: true })}
        />
      </div>

      <div className="field">
        <label htmlFor="rhf-email">Email</label>
        <input id="rhf-email" type="email" {...register('email')} />
      </div>

      <fieldset className="field radio-group">
        <legend>Gender</legend>
        <div className="radio-options">
          <div className="radio">
            <input
              id="rhf-gender-male"
              type="radio"
              value="male"
              {...register('gender')}
            />
            <label htmlFor="rhf-gender-male">Male</label>
          </div>
          <div className="radio">
            <input
              id="rhf-gender-female"
              type="radio"
              value="female"
              {...register('gender')}
            />
            <label htmlFor="rhf-gender-female">Female</label>
          </div>
        </div>
      </fieldset>

      <div className="checkbox-field">
        <input id="rhf-terms" type="checkbox" {...register('acceptTerms')} />
        <label htmlFor="rhf-terms">I accept the Terms and Conditions</label>
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RhfForm;
