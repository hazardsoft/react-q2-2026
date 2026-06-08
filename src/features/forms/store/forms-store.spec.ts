import { beforeEach, describe, expect, it } from 'vitest';
import { COUNTRIES } from '../data/countries';
import type { SubmissionInput } from '../types';
import { selectCountries, selectSubmissions, useFormsStore } from './forms-store';

const sampleInput: SubmissionInput = {
  source: 'uncontrolled',
  name: 'Henadzi Shutko',
  age: 39,
  email: 'hazardsoft@gmail.com',
  gender: 'male',
  country: 'Belarus',
  acceptedTerms: true,
  image: '',
};

describe('forms store', () => {
  beforeEach(() => {
    useFormsStore.setState({ submissions: [], countries: COUNTRIES });
  });

  it('starts with no submissions and the seeded countries', () => {
    expect(selectSubmissions(useFormsStore.getState())).toEqual([]);
    expect(selectCountries(useFormsStore.getState())).toBe(COUNTRIES);
  });

  it('addSubmission stores the data with a generated id and createdAt', () => {
    useFormsStore.getState().addSubmission(sampleInput);

    const [submission] = selectSubmissions(useFormsStore.getState());
    expect(submission).toMatchObject(sampleInput);
    expect(submission.id).toBeTruthy();
    expect(typeof submission.createdAt).toBe('number');
  });

  it('keeps a history with the newest submission first', () => {
    useFormsStore.getState().addSubmission({ ...sampleInput, name: 'First' });
    useFormsStore
      .getState()
      .addSubmission({ ...sampleInput, name: 'Second', source: 'rhf' });

    const submissions = selectSubmissions(useFormsStore.getState());
    expect(submissions).toHaveLength(2);
    expect(submissions[0].name).toBe('Second');
    expect(submissions[1].name).toBe('First');
  });

  it('gives each submission a unique id', () => {
    useFormsStore.getState().addSubmission(sampleInput);
    useFormsStore.getState().addSubmission(sampleInput);

    const [first, second] = selectSubmissions(useFormsStore.getState());
    expect(first.id).not.toBe(second.id);
  });
});
