import { ArticleType } from '@/store/slices/types.slices';

import { Pagination } from 'antd';
import { CardArticle } from '..';

interface ArticlesProps {
  articles?: ArticleType[];
  articlesCount?: number;
  limit: number;
  setLimit: (e: number) => void;
  setOffset: (e: number) => void;
  offset?: number;
}

export const CardsArticles = ({ articles, articlesCount, limit, setLimit, setOffset }: ArticlesProps) => {
  if (!articles) return;

  const handlerChangePage = (page: number, pageSize: number) => {
    setLimit(pageSize);
    if (page === 1) {
      return setOffset(0);
    }
    setOffset(pageSize * page);
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
          />
        );
      })}
      <Pagination
        className="mt-[26px] mb-[17px]"
        align="center"
        total={articlesCount}
        onChange={handlerChangePage}
        pageSize={limit}
      />
    </div>
  );
};
