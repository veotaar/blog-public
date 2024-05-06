import { createFileRoute } from '@tanstack/react-router';
// import { Link } from '@tanstack/react-router';
// import { cn } from '../lib/utils';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="bg-background mx-auto max-w-screen-lg overflow-hidden text-ellipsis whitespace-nowrap p-2">
      <p>Welcome to blog public!</p>
    </div>
  );
}
