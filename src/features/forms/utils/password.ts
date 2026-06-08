export type PasswordChecks = {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
};

const isDigit = (char: string): boolean => char >= '0' && char <= '9';
const isUppercase = (char: string): boolean => char >= 'A' && char <= 'Z';
const isLowercase = (char: string): boolean => char >= 'a' && char <= 'z';
const isSpecial = (char: string): boolean =>
  char.trim() !== '' &&
  !isDigit(char) &&
  !isUppercase(char) &&
  !isLowercase(char);

export const getPasswordChecks = (password: string): PasswordChecks => {
  const chars = [...password];
  return {
    hasUppercase: chars.some(isUppercase),
    hasLowercase: chars.some(isLowercase),
    hasNumber: chars.some(isDigit),
    hasSpecial: chars.some(isSpecial),
  };
};
