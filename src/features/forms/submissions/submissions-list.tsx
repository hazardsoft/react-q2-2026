import { useEffect, useState } from 'react';
import { selectSubmissions, useFormsStore } from '../store/forms-store';
import SubmissionCard from './submission-card';
import './submissions-list.css';

const HIGHLIGHT_DURATION_MS = 3000;

const SubmissionsList = () => {
  const submissions = useFormsStore(selectSubmissions);
  const latestId = submissions[0]?.id;
  const [expiredId, setExpiredId] = useState<string | null>(null);
  // Derived during render — the newest submission is highlighted until its
  // timer marks it expired, so there is no setState inside the effect body.
  const highlightedId = latestId && latestId !== expiredId ? latestId : null;

  useEffect(() => {
    if (!latestId) return;
    const timer = setTimeout(
      () => setExpiredId(latestId),
      HIGHLIGHT_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, [latestId]);

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
        <SubmissionCard
          key={submission.id}
          submission={submission}
          highlighted={submission.id === highlightedId}
        />
      ))}
    </section>
  );
};

export default SubmissionsList;
