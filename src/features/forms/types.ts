export type FormSource = 'uncontrolled' | 'rhf';

export type Gender = 'male' | 'female';

export type Submission = {
  id: string;
  source: FormSource;
  createdAt: number;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  country: string;
  acceptedTerms: boolean;
  image: string;
};

export type SubmissionInput = Omit<Submission, 'id' | 'createdAt'>;

export type FormValues = {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  image: string;
};
