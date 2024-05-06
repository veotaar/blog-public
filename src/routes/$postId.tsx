import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$postId')({
  component: () => <div>Hello /$postId!</div>,
});
