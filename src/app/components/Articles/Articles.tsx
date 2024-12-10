import { ArticleType } from '@/store/slices/types.slices';
import { Article } from '..';
import { Pagination } from 'antd';

interface ArticlesProps {
  articles: ArticleType[];
  articlesCount: number;
  limit: number;
  setLimit: (e: number) => void;
  offset: number;
  setOffset: (e: number) => void;
}

export const Articles = ({ articles, articlesCount, limit, setLimit, offset, setOffset }: ArticlesProps) => {
  console.log(articles);
  const handlerChangePage = (page: number, pageSize: number) => {
    setLimit(pageSize);
    if (page === 1) {
      return setOffset(0);
    }
    setOffset(pageSize * page);
    console.log('offset', offset);
  };
  return (
    <div className="flex flex-col  gap-[26px] mt-[26px]">
      {articles.map((article, index) => {
        return (
          <Article
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
      <Pagination align="center" total={articlesCount} onChange={handlerChangePage} pageSize={limit} />
    </div>
  );
};
