import { queryOptions, QueryClient, useMutation } from '@tanstack/react-query';
import { getArticles } from './getArticles';
import { getArticle } from './getArticle';
import { getCommentStatus } from './getCommentStatus';
import { createComment } from './createComment';
import { useRouter } from '@tanstack/react-router';

export const queryClient = new QueryClient();

export const articlesQueryOptions = (page: number) => {
  return queryOptions({
    queryKey: ['articles', { page: page }],
    queryFn: () => getArticles(page),
  });
};

export const articleQueryOptions = (postId: string) => {
  return queryOptions({
    queryKey: ['article', { id: postId }],
    queryFn: () => getArticle(postId),
  });
};

export const commentsQueryOptions = () => {
  return queryOptions({
    queryKey: ['settings', 'comment'],
    queryFn: () => getCommentStatus(),
  });
};

export const useCreateCommentMutation = (postId: string, page: number) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['article', { id: postId }, 'createComment'],
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['articles', { page: page }] });
      await queryClient.invalidateQueries({ queryKey: ['article', { id: postId }] });
      await queryClient.refetchQueries({ queryKey: ['article', { id: postId }] });
      await router.invalidate();
    },
  });
};
