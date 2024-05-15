import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft } from 'lucide-react';
// import { buttonVariants } from '@/components/ui/button';
import buttonVariants from '@/components/ui/buttonVariants';
import { articleQueryOptions } from '@/api/queryOptions';
import { commentsQueryOptions } from '@/api/queryOptions';
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
    return await Promise.all([
      context.queryClient.ensureQueryData(articleQueryOptions(params.postId)),
      context.queryClient.ensureQueryData(commentsQueryOptions()),
    ]);
  },
});

function Post() {
  const { page } = Route.useSearch();
  const loaderData = Route.useLoaderData();
  const { postId } = Route.useParams();

  const { title, author, content, commentCount, comments, createdAt, updatedAt } = loaderData[0].data.post;
  const { allowComments } = loaderData[1].data;

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

      <div className="max-w-screen-lg overflow-hidden text-ellipsis rounded border bg-card p-2 py-16 shadow-sm">
        <div className="mx-auto mb-4 max-w-screen-sm">
          <p className="font-bold">By {author ? author.username : 'deleted user'}</p>
          <div className="flex gap-2 text-sm">
            <p>{format(createdAt, 'PPp')}</p>
            <p>{createdAt === updatedAt ? '' : `• updated ${format(updatedAt, 'PPp')}`}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="prose w-full max-w-screen-sm dark:prose-invert prose-th:text-left"
            components={markdownComponentOptions}
          >
            {`# ${title}\n${content}`}
          </Markdown>
        </div>
      </div>

      {allowComments ? (
        <div
          className={cn(
            'flex flex-col items-center gap-4 overflow-hidden text-ellipsis rounded border bg-background p-2 pb-8',
          )}
        >
          <p className="text-lg">Join the discussion</p>
          <CommentForm postId={postId} page={page} disabled={commentCount >= 100} />
        </div>
      ) : (
        <p className="text-center text-lg">New comments are not allowed at this time.</p>
      )}

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
                  key={comment.id}
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
