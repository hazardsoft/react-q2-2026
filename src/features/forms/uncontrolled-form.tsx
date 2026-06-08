import { useMemo, useState, type FormEvent } from 'react';
import './form.css';
import type { FormValues } from './types';
import { createFormSchema, type SchemaValues } from './schema/form-schema';
import { ACCEPTED_IMAGE_TYPES, fileToBase64 } from './utils/image';
import { selectCountries, useFormsStore } from './store/forms-store';
import PasswordStrength from './components/password-strength';
import CountryAutocomplete from './components/country-autocomplete';
import FieldError from './components/field-error';

type UncontrolledFormProps = {
  onSubmit: (values: FormValues) => void;
};

type FieldErrors = Partial<Record<keyof SchemaValues, string>>;

const UncontrolledForm = ({ onSubmit }: UncontrolledFormProps) => {
  const countries = useFormsStore(selectCountries);
  const schema = useMemo(() => createFormSchema(countries), [countries]);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const imageInput = form.elements.namedItem('image');
    const ageRaw = String(data.get('age') ?? '').trim();

    const result = schema.safeParse({
      name: String(data.get('name') ?? '').trim(),
      age: ageRaw === '' ? Number.NaN : Number(ageRaw),
      email: String(data.get('email') ?? '').trim(),
      gender: String(data.get('gender') ?? ''),
      country: String(data.get('country') ?? '').trim(),
      password: String(data.get('password') ?? ''),
      confirmPassword: String(data.get('confirmPassword') ?? ''),
      acceptTerms: data.get('acceptTerms') === 'on',
      image: imageInput instanceof HTMLInputElement ? imageInput.files : null,
    });

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SchemaValues;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const image = await fileToBase64(result.data.image[0]);
    onSubmit({ ...result.data, image });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        <FieldError message={errors.name} />
      </div>

      <div className="field">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" min="0" />
        <FieldError message={errors.age} />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        <FieldError message={errors.email} />
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
        <FieldError message={errors.gender} />
      </fieldset>

      <CountryAutocomplete id="country" name="country" error={errors.country} />

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordStrength password={password} />
        <FieldError message={errors.password} />
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
        <FieldError message={errors.confirmPassword} />
      </div>

      <div className="field">
        <label htmlFor="image">Profile image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
        />
        <FieldError message={errors.image} />
      </div>

      <div className="checkbox-field">
        <input id="terms" name="acceptTerms" type="checkbox" />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
      </div>
      <FieldError message={errors.acceptTerms} />

      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
