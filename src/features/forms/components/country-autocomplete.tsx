import type { UseFormRegisterReturn } from 'react-hook-form';
import { selectCountries, useFormsStore } from '../store/forms-store';

type CountryAutocompleteProps = {
  id: string;
  name?: string;
  registration?: UseFormRegisterReturn;
};

const CountryAutocomplete = ({
  id,
  name,
  registration,
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
    </div>
  );
};

export default CountryAutocomplete;
