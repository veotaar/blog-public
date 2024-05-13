import { formatDistanceToNowStrict } from 'date-fns';
import { decode } from 'html-entities';
import { cn } from '@/lib/utils';

type CommentProps = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

const Comment = ({ id, author, content, createdAt }: CommentProps) => {
  return (
    <div key={id} className={cn('group flex items-center justify-between gap-2 rounded-md border bg-card p-4 px-6')}>
      <div>
        <p>
          <span className="font-bold">{author}</span>{' '}
          <span className="text-muted-foreground">{formatDistanceToNowStrict(createdAt, { addSuffix: true })}</span>
        </p>
        <p className="text-neutral-600 dark:text-neutral-300">{decode(content)}</p>
      </div>
    </div>
  );
};

export default Comment;
