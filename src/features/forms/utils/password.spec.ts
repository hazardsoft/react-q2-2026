import { describe, expect, it } from 'vitest';
import { getPasswordChecks } from './password';

describe('getPasswordChecks', () => {
  it('reports all checks as false for an empty password', () => {
    expect(getPasswordChecks('')).toEqual({
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecial: false,
    });
  });

  it('detects each character class independently', () => {
    expect(getPasswordChecks('a')).toMatchObject({ hasLowercase: true });
    expect(getPasswordChecks('A')).toMatchObject({ hasUppercase: true });
    expect(getPasswordChecks('1')).toMatchObject({ hasNumber: true });
    expect(getPasswordChecks('!')).toMatchObject({ hasSpecial: true });
  });

  it('does not count letters or digits as special characters', () => {
    expect(getPasswordChecks('Abc123').hasSpecial).toBe(false);
  });

  it('reports all checks as true for a strong password', () => {
    expect(getPasswordChecks('Aa1!')).toEqual({
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: true,
      hasSpecial: true,
    });
  });
});
