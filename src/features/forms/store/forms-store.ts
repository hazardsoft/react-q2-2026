import { create } from 'zustand';
import { COUNTRIES } from '../data/countries';
import type { Submission, SubmissionInput } from '../types';

export type FormsState = {
  submissions: Submission[];
  countries: string[];
  addSubmission: (input: SubmissionInput) => void;
};

export const useFormsStore = create<FormsState>((set) => ({
  submissions: [],
  countries: COUNTRIES,
  addSubmission: (input) =>
    set((state) => ({
      submissions: [
        { ...input, id: crypto.randomUUID(), createdAt: Date.now() },
        ...state.submissions,
      ],
    })),
}));

export const selectSubmissions = (state: FormsState): Submission[] =>
  state.submissions;

export const selectCountries = (state: FormsState): string[] => state.countries;
