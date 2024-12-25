import { ArticleType } from '@/store/slices/types.slices';

import { Pagination } from 'antd';
import { CardArticle } from '..';
import { sessionStore } from '@/utils/helpers/sessionStore';

interface ArticlesProps {
  articles?: ArticleType[];
  articlesCount?: number;
  limit: number;
  setLimit: (e: number) => void;
  setOffset: (e: number) => void;
  isLoadingArticles: boolean;
  offset?: number;
}

export const CardsArticles = ({
  articles,
  articlesCount,
  limit,
  setLimit,
  setOffset,
  isLoadingArticles,
}: ArticlesProps) => {
  if (!articles) return;
  const { setElemToSessionStorage, getElemToSessionStorage } = sessionStore();
  const pageSession = getElemToSessionStorage('page');

  const handlerChangePage = (page: number, pageSize: number) => {
    setElemToSessionStorage('page', page);
    setLimit(pageSize);
    if (page === 1) {
      return setOffset(0);
    }
    setOffset((page - 1) * pageSize);
  };

  return (
    <div className="flex flex-col  gap-[26px] mt-[26px]">
      {articles.map((article, index) => {
        return (
          <CardArticle
            key={index}
            description={article.description}
            title={article.title}
            createDateArticle={article.createdAt}
            userIcon={article.author.image}
            userName={article.author.username}
            tags={article.tagList}
            likes={article.favoritesCount}
            slug={article.slug}
            favorited={article.favorited}
            isLoadingArticles={isLoadingArticles}
          />
        );
      })}
      <Pagination
        className="mt-[26px] mb-[17px]"
        align="center"
        total={articlesCount}
        onChange={handlerChangePage}
        pageSize={limit}
        defaultCurrent={pageSession ?? 1}
        disabled={isLoadingArticles}
      />
    </div>
  );
};
