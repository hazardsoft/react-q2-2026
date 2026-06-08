import { useState, type FormEvent } from 'react';
import './form.css';
import type { FormValues } from './types';
import { ACCEPTED_IMAGE_TYPES, fileToBase64 } from './utils/image';
import PasswordStrength from './components/password-strength';
import CountryAutocomplete from './components/country-autocomplete';

type UncontrolledFormProps = {
  onSubmit: (values: FormValues) => void;
};

const UncontrolledForm = ({ onSubmit }: UncontrolledFormProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const imageInput = form.elements.namedItem('image');
    const file =
      imageInput instanceof HTMLInputElement ? imageInput.files?.[0] : undefined;
    const image = file ? await fileToBase64(file) : '';

    onSubmit({
      name: String(data.get('name') ?? '').trim(),
      age: Number(data.get('age')),
      email: String(data.get('email') ?? '').trim(),
      gender: String(data.get('gender') ?? ''),
      country: String(data.get('country') ?? '').trim(),
      password: String(data.get('password') ?? ''),
      confirmPassword: String(data.get('confirmPassword') ?? ''),
      acceptTerms: data.get('acceptTerms') === 'on',
      image,
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

      <CountryAutocomplete id="country" name="country" />

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordStrength password={password} />
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
      </div>

      <div className="field">
        <label htmlFor="image">Profile image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
        />
      </div>

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
