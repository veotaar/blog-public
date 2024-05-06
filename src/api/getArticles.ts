import { axios } from './axios.ts';

export type PostPreview = {
  author: {
    username: string;
    id: string;
  } | null;
  id: string;
  title: string;
  commentCount: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ArticleListResponse = {
  status: 'success' | 'fail' | 'error';
  data: {
    itemsPerPage: number;
    totalItems: number;
    currentItemCount: number;
    totalPages: number;
    posts: PostPreview[];
  };
};

export const getArticles = async (page: number): Promise<ArticleListResponse> => {
  const response = await axios.get('/posts', {
    params: {
      page,
    },
  });
  return response.data;
};
