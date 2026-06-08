import { createFileRoute } from '@tanstack/react-router';
import FormsPage from '../pages/forms';

export const Route = createFileRoute('/forms')({
  component: FormsPage,
});
