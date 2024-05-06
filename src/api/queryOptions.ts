import { queryOptions, QueryClient } from '@tanstack/react-query';
import { getArticles } from './getArticles';

export const queryClient = new QueryClient();

export const articlesQueryOptions = (page: number) => {
  return queryOptions({
    queryKey: ['articles', { page: page }],
    queryFn: () => getArticles(page),
  });
};
