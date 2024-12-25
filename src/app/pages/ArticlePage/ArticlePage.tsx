import { Article } from '@/app/components';
import { useGetArticleQuery } from '@/store/slices/api/articleApi';
import { routs } from '@/utils/constant/routes';
import { Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ArticlePage = () => {
  const { slug } = useParams();
  if (!slug) return null;
  const { data, isLoading, isError } = useGetArticleQuery({ slug });
  const navigate = useNavigate();

  if (isError) {
    navigate(routs.ARTICLE);
    toast.error('Ошибка, проверьте интернет');
  }

  return isLoading || !data ? (
    <Spin className="absolute inset-0 top-2/4" size="large" />
  ) : (
    <Article data={data?.article} />
  );
};
