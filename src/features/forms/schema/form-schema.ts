import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../utils/image';

// Deliberately minimal, regex-free email check (see task FAQ): exactly one @,
// a non-empty local part, and a domain with at least one dot and no empty parts.
export const isValidEmail = (email: string): boolean => {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (local.length === 0) return false;
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  return domainParts.every((part) => part.length > 0);
};

const startsWithUppercase = (value: string): boolean =>
  value.length > 0 &&
  value[0] === value[0].toUpperCase() &&
  value[0] !== value[0].toLowerCase();

const isImageList = (value: unknown): value is FileList =>
  value != null &&
  typeof value === 'object' &&
  typeof (value as FileList).length === 'number' &&
  typeof (value as FileList).item === 'function';

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine(startsWithUppercase, 'Name must start with an uppercase letter'),
      age: z
        .number('Age is required')
        .refine((value) => value >= 0, 'Age cannot be negative'),
      email: z
        .string()
        .refine(isValidEmail, 'Enter a valid email, e.g. name@example.com'),
      gender: z.enum(['male', 'female'], 'Select a gender'),
      country: z
        .string()
        .refine(
          (value) => countries.includes(value),
          'Select a country from the list'
        ),
      password: z.string().min(1, 'Password is required'),
      confirmPassword: z.string().min(1, 'Confirm your password'),
      acceptTerms: z.literal(true, 'You must accept the Terms and Conditions'),
      image: z
        .custom<FileList>()
        .refine(
          (files) => isImageList(files) && files.length > 0,
          'Profile image is required'
        )
        .refine(
          (files) =>
            !isImageList(files) ||
            files.length === 0 ||
            (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(files[0].type),
          'Image must be a PNG or JPEG'
        )
        .refine(
          (files) =>
            !isImageList(files) ||
            files.length === 0 ||
            files[0].size <= MAX_IMAGE_SIZE,
          'Image must be 2 MB or smaller'
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

export type SchemaValues = z.infer<ReturnType<typeof createFormSchema>>;
