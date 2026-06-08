import type { UseFormRegisterReturn } from 'react-hook-form';
import { selectCountries, useFormsStore } from '../store/forms-store';
import FieldError from './field-error';

type CountryAutocompleteProps = {
  id: string;
  name?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
};

const CountryAutocomplete = ({
  id,
  name,
  registration,
  error,
}: CountryAutocompleteProps) => {
  const countries = useFormsStore(selectCountries);
  const listId = `${id}-options`;

  return (
    <div className="field">
      <label htmlFor={id}>Country</label>
      <input
        id={id}
        type="text"
        list={listId}
        name={name}
        autoComplete="off"
        {...registration}
      />
      <datalist id={listId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <FieldError message={error} />
    </div>
  );
};

export default CountryAutocomplete;
