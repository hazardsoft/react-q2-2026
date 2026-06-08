import type { Submission } from '../types';
import './submission-card.css';

const SOURCE_LABELS: Record<Submission['source'], string> = {
  uncontrolled: 'Uncontrolled',
  rhf: 'React Hook Form',
};

type SubmissionCardProps = {
  submission: Submission;
  highlighted?: boolean;
};

const SubmissionCard = ({ submission, highlighted }: SubmissionCardProps) => {
  const { name, age, email, gender, country, image, source, acceptedTerms } =
    submission;

  return (
    <article
      className={highlighted ? 'submission-card is-new' : 'submission-card'}
    >
      <div className="submission-avatar">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <span className="submission-avatar-fallback" aria-hidden="true">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <div className="submission-body">
        <div className="submission-head">
          <h3 className="submission-name">{name}</h3>
          <span className="submission-source">{SOURCE_LABELS[source]}</span>
        </div>
        <dl className="submission-fields">
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{age}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{gender}</dd>
          </div>
          <div>
            <dt>Country</dt>
            <dd>{country}</dd>
          </div>
          <div>
            <dt>Terms</dt>
            <dd>{acceptedTerms ? 'Accepted' : 'Not accepted'}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export default SubmissionCard;
