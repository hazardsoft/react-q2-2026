import './field-error.css';

type FieldErrorProps = {
  message?: string;
};

const FieldError = ({ message }: FieldErrorProps) => (
  <p className="field-error">{message}</p>
);

export default FieldError;
