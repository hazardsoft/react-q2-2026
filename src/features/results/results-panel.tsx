'use client';

import { type MouseEvent, type ReactNode } from 'react';
import { useRouter } from '@/i18n/navigation';
import type { HomeHref } from './home-href';
import './results.css';

type ResultsPanelProps = {
  // When set (i.e. the details panel is open), clicking the panel background
  // navigates here to close the details panel.
  closeHref?: HomeHref;
  children: ReactNode;
};

const ResultsPanel = ({ closeHref, children }: ResultsPanelProps) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!closeHref) return;
    // Ignore clicks that land on a card/pagination link.
    if ((event.target as HTMLElement).closest('a')) return;
    router.push(closeHref);
  };

  return (
    <section id="results" onClick={handleClick}>
      {children}
    </section>
  );
};

export default ResultsPanel;
