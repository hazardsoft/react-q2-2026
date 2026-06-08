import { getPasswordChecks } from '../utils/password';
import './password-strength.css';

type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const checks = getPasswordChecks(password);
  const items = [
    { key: 'uppercase', label: '1 uppercase letter', met: checks.hasUppercase },
    { key: 'lowercase', label: '1 lowercase letter', met: checks.hasLowercase },
    { key: 'number', label: '1 number', met: checks.hasNumber },
    { key: 'special', label: '1 special character', met: checks.hasSpecial },
  ];

  return (
    <ul className="password-strength">
      {items.map((item) => (
        <li
          key={item.key}
          className={item.met ? 'strength-item met' : 'strength-item'}
        >
          <span className="strength-mark" aria-hidden="true">
            {item.met ? '✓' : '○'}
          </span>
          <span className="strength-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default PasswordStrength;
