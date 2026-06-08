import { selectSubmissions, useFormsStore } from '../store/forms-store';
import SubmissionCard from './submission-card';
import './submissions-list.css';

const SubmissionsList = () => {
  const submissions = useFormsStore(selectSubmissions);

  if (submissions.length === 0) {
    return (
      <p className="submissions-empty">
        No submissions yet — open a form above to add one.
      </p>
    );
  }

  return (
    <section className="submissions">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </section>
  );
};

export default SubmissionsList;
