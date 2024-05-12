import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft } from 'lucide-react';
// import { buttonVariants } from '@/components/ui/button';
import buttonVariants from '@/components/ui/buttonVariants';
import { articleQueryOptions } from '@/api/queryOptions';
import { z } from 'zod';
import { cn } from '../lib/utils';

// import { toast } from 'sonner';

import CommentForm from '@/components/CommentForm';
import Comment from '@/components/Comment';
import { CodeBlock } from '@/components/CodeBlock';
import { format } from 'date-fns';

const postsSearchSchema = z.object({
  page: z.number().catch(1),
});

export const Route = createFileRoute('/$postId')({
  component: Post,
  validateSearch: postsSearchSchema,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(articleQueryOptions(params.postId));
  },
});

function Post() {
  const { page } = Route.useSearch();
  const loaderData = Route.useLoaderData();
  const { postId } = Route.useParams();

  const { title, author, content, commentCount, comments, createdAt, updatedAt } = loaderData.data.post;

  const markdownComponentOptions = {
    code: CodeBlock,
    pre: ({ ...props }) => <div className="not-prose">{props.children}</div>,
  };

  if (!loaderData) {
    return <p>loading...</p>;
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-4">
      <div className="flex items-center">
        <Link
          className={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'gap-1 pl-2.5')}
          to="/"
          search={{ page: page }}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Go back to posts</span>
        </Link>
      </div>
      <div className="mx-auto flex w-full gap-6 px-6 py-4 text-muted-foreground">
        <div>
          <p>Article Title:</p>
          <p>Author:</p>
          <p>Created:</p>
          <p>Last modified:</p>
        </div>
        <div>
          <p className="italic">{title}</p>
          <p>{author ? author.username : 'deleted user'}</p>
          <p>{format(createdAt, 'yyyy/MM/dd, kk:mm:ss, zzzz')}</p>
          <p>{format(updatedAt, 'yyyy/MM/dd, kk:mm:ss, zzzz')}</p>
        </div>
      </div>
      <div className="max-w-screen-lg overflow-hidden text-ellipsis rounded border bg-card p-2 py-8">
        <div className="flex justify-center py-8">
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="prose w-full max-w-screen-sm dark:prose-invert"
            components={markdownComponentOptions}
          >
            {content}
          </Markdown>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col items-center gap-4 overflow-hidden text-ellipsis rounded border bg-background p-2 pb-8',
        )}
      >
        <p className="text-lg">Join the discussion</p>
        <CommentForm postId={postId} page={page} disabled={commentCount >= 20} />
      </div>
      <div className="mb-8 flex flex-col items-center gap-2 p-2">
        <p className="text-lg">{commentCount > 0 ? 'Comments' : 'There are no comments yet'}</p>
        <div
          className={cn(
            'flex w-full flex-col-reverse gap-2 overflow-hidden text-ellipsis bg-background p-2 pb-8 md:w-3/5',
          )}
        >
          {commentCount > 0
            ? comments.map((comment) => (
                <Comment
                  id={comment.id}
                  author={comment.author}
                  content={comment.content}
                  createdAt={comment.createdAt}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
