import { createFileRoute } from '@tanstack/react-router';
import Paginator from '@/components/Paginator';
import { z } from 'zod';
import ArticleList from '@/components/ArticleList';
import { cn } from '../lib/utils';
import { articlesQueryOptions } from '@/api/queryOptions';

const indexSearchSchema = z.object({
  page: z.number().catch(1),
});

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: indexSearchSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ deps: { page }, context }) => context.queryClient.ensureQueryData(articlesQueryOptions(page)),
});

function Index() {
  const { page } = Route.useSearch();
  const loaderData = Route.useLoaderData();

  if (!loaderData) {
    return <p>loading...</p>;
  }

  return (
    <div
      className={cn('mx-auto flex max-w-screen-md flex-col gap-4 overflow-hidden text-ellipsis whitespace-nowrap p-4')}
    >
      <ArticleList data={loaderData.data} />
      <Paginator currentPage={page as number} totalPages={loaderData.data.totalPages} pagesAroundCurrent={2} />
    </div>
  );
}
