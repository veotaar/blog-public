import { createFileRoute } from '@tanstack/react-router';
import { CodeBlock } from '@/components/CodeBlock';
import aboutText from '../about.md';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const markdownComponentOptions = {
    code: CodeBlock,
    pre: ({ ...props }) => <div className="not-prose">{props.children}</div>,
  };

  return (
    <div className="mx-auto mb-8 mt-4 max-w-screen-lg overflow-hidden text-ellipsis rounded border bg-card p-2 py-8 shadow-sm">
      <div className="flex justify-center py-8">
        <Markdown
          remarkPlugins={[remarkGfm]}
          className="prose w-full max-w-screen-sm dark:prose-invert prose-th:text-left"
          components={markdownComponentOptions}
        >
          {aboutText}
        </Markdown>
      </div>
    </div>
  );
}
