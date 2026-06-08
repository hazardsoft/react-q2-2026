import { describe, expect, it } from 'vitest';
import { createFormSchema, isValidEmail } from './form-schema';
import type { SchemaValues } from './form-schema';

const countries = ['Australia', 'Belarus'];
const schema = createFormSchema(countries);

const fileList = (file: File): FileList =>
  ({
    0: file,
    length: 1,
    item: (index: number) => (index === 0 ? file : null),
  }) as unknown as FileList;

const pngFile = new File(['x'], 'a.png', { type: 'image/png' });

const validValues: SchemaValues = {
  name: 'Ada',
  age: 30,
  email: 'ada@example.com',
  gender: 'female',
  country: 'Australia',
  password: 'Passw0rd!',
  confirmPassword: 'Passw0rd!',
  acceptTerms: true,
  image: fileList(pngFile),
};

const errorFor = (overrides: Record<string, unknown>, field: string) => {
  const result = schema.safeParse({ ...validValues, ...overrides });
  if (result.success) return undefined;
  return result.error.issues.find((issue) => issue.path[0] === field)?.message;
};

describe('isValidEmail', () => {
  it('accepts a basic well-formed email', () => {
    expect(isValidEmail('name@example.com')).toBe(true);
  });

  it('rejects emails without exactly one @, local part, or a dotted domain', () => {
    expect(isValidEmail('nameexample.com')).toBe(false);
    expect(isValidEmail('a@b@c.com')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('name@example')).toBe(false);
    expect(isValidEmail('name@.com')).toBe(false);
  });
});

describe('createFormSchema', () => {
  it('accepts fully valid values', () => {
    expect(schema.safeParse(validValues).success).toBe(true);
  });

  it('requires the name to start with an uppercase letter', () => {
    expect(errorFor({ name: 'ada' }, 'name')).toMatch(/uppercase/i);
  });

  it('rejects a negative age', () => {
    expect(errorFor({ age: -1 }, 'age')).toMatch(/negative/i);
  });

  it('rejects a non-numeric (empty) age', () => {
    expect(errorFor({ age: Number.NaN }, 'age')).toBeTruthy();
  });

  it('rejects an invalid email', () => {
    expect(errorFor({ email: 'bad' }, 'email')).toBeTruthy();
  });

  it('requires a gender selection', () => {
    expect(errorFor({ gender: '' }, 'gender')).toBeTruthy();
  });

  it('rejects a country outside the stored list', () => {
    expect(errorFor({ country: 'Atlantis' }, 'country')).toBeTruthy();
  });

  it('rejects mismatched passwords on the confirm field', () => {
    expect(errorFor({ confirmPassword: 'different' }, 'confirmPassword')).toMatch(
      /match/i
    );
  });

  it('requires the terms to be accepted', () => {
    expect(errorFor({ acceptTerms: false }, 'acceptTerms')).toBeTruthy();
  });

  it('rejects an image with the wrong type', () => {
    const gif = fileList(new File(['x'], 'a.gif', { type: 'image/gif' }));
    expect(errorFor({ image: gif }, 'image')).toMatch(/png or jpeg/i);
  });
});
