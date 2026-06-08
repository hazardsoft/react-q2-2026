import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './form.css';
import type { FormValues } from './types';
import { ACCEPTED_IMAGE_TYPES, fileToBase64 } from './utils/image';
import PasswordStrength from './components/password-strength';
import CountryAutocomplete from './components/country-autocomplete';

type RhfFields = Omit<FormValues, 'image'> & { image: FileList };

type RhfFormProps = {
  onSubmit: (values: FormValues) => void;
};

const RhfForm = ({ onSubmit }: RhfFormProps) => {
  const { register, handleSubmit } = useForm<RhfFields>();
  const [password, setPassword] = useState('');
  const passwordField = register('password');

  const submit = handleSubmit(async (fields) => {
    const file = fields.image?.[0];
    const image = file ? await fileToBase64(file) : '';
    onSubmit({ ...fields, image });
  });

  return (
    <form className="form" onSubmit={submit} noValidate>
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

      <CountryAutocomplete id="rhf-country" registration={register('country')} />

      <div className="field">
        <label htmlFor="rhf-password">Password</label>
        <input
          id="rhf-password"
          type="password"
          {...passwordField}
          onChange={(event) => {
            passwordField.onChange(event);
            setPassword(event.target.value);
          }}
        />
        <PasswordStrength password={password} />
      </div>

      <div className="field">
        <label htmlFor="rhf-confirmPassword">Confirm password</label>
        <input
          id="rhf-confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
      </div>

      <div className="field">
        <label htmlFor="rhf-image">Profile image</label>
        <input
          id="rhf-image"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          {...register('image')}
        />
      </div>

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
