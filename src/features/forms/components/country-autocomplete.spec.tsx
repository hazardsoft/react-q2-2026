import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { COUNTRIES } from '../data/countries';
import { useFormsStore } from '../store/forms-store';
import CountryAutocomplete from './country-autocomplete';

const reset = () => useFormsStore.setState({ countries: COUNTRIES });

describe('CountryAutocomplete', () => {
  beforeEach(() => useFormsStore.setState({ countries: ['Australia', 'Belarus'] }));
  afterEach(reset);

  it('renders a labeled input wired to a datalist', () => {
    render(<CountryAutocomplete id="country" name="country" />);

    const input = screen.getByLabelText('Country');
    const listId = input.getAttribute('list');
    expect(listId).toBeTruthy();
    expect(input).toHaveAttribute('name', 'country');
  });

  it('lists the countries from the store as options', () => {
    const { container } = render(
      <CountryAutocomplete id="country" name="country" />
    );

    const options = [...container.querySelectorAll('option')].map(
      (o) => o.value
    );
    expect(options).toEqual(['Australia', 'Belarus']);
  });
});
