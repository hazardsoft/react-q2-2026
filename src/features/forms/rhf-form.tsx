import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './form.css';
import type { FormValues } from './types';
import { createFormSchema, type SchemaValues } from './schema/form-schema';
import { ACCEPTED_IMAGE_TYPES, fileToBase64 } from './utils/image';
import { selectCountries, useFormsStore } from './store/forms-store';
import PasswordStrength from './components/password-strength';
import CountryAutocomplete from './components/country-autocomplete';
import FieldError from './components/field-error';

type RhfFormProps = {
  onSubmit: (values: FormValues) => void;
};

const RhfForm = ({ onSubmit }: RhfFormProps) => {
  const countries = useFormsStore(selectCountries);
  const schema = useMemo(() => createFormSchema(countries), [countries]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchemaValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const [password, setPassword] = useState('');
  const passwordField = register('password');

  const submit = handleSubmit(async (values) => {
    const image = await fileToBase64(values.image[0]);
    onSubmit({ ...values, image });
  });

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="rhf-name">Name</label>
        <input id="rhf-name" type="text" {...register('name')} />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="field">
        <label htmlFor="rhf-age">Age</label>
        <input
          id="rhf-age"
          type="number"
          min="0"
          {...register('age', { valueAsNumber: true })}
        />
        <FieldError message={errors.age?.message} />
      </div>

      <div className="field">
        <label htmlFor="rhf-email">Email</label>
        <input id="rhf-email" type="email" {...register('email')} />
        <FieldError message={errors.email?.message} />
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
        <FieldError message={errors.gender?.message} />
      </fieldset>

      <CountryAutocomplete
        id="rhf-country"
        registration={register('country')}
        error={errors.country?.message}
      />

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
        <FieldError message={errors.password?.message} />
      </div>

      <div className="field">
        <label htmlFor="rhf-confirmPassword">Confirm password</label>
        <input
          id="rhf-confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <FieldError message={errors.confirmPassword?.message} />
      </div>

      <div className="field">
        <label htmlFor="rhf-image">Profile image</label>
        <input
          id="rhf-image"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          {...register('image')}
        />
        <FieldError message={errors.image?.message} />
      </div>

      <div className="checkbox-field">
        <input id="rhf-terms" type="checkbox" {...register('acceptTerms')} />
        <label htmlFor="rhf-terms">I accept the Terms and Conditions</label>
      </div>
      <FieldError message={errors.acceptTerms?.message} />

      <div className="form-actions">
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default RhfForm;
