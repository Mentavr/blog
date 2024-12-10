import { TagArticle } from '@/app/components';
import { HartIcon } from '@/assets/icons/HartIcon';
import { useGetArticleQuery } from '@/store/slices/api/articleApi';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

export const ArticlePage = () => {
  const { slug } = useParams();
  if (!slug) return null;

  const { data } = useGetArticleQuery({ slug });
  console.log('slug', slug);
  console.log('data', data);

  if (!data) return null;

  const { title, description, body, tagList, createdAt, updatedAt, favorited, favoritesCount, author } = data.article;

  return (
    <div className="w-full px-[16px] pt-[15px] pb-[100px] bg-backgroundColorBase shadow-custom mt-[26px]">
      <header className="flex gap-[4px] flex-col mb-[25px]">
        <div className="flex gap-[4px] items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-[13px] items-center">
              <h3 className="text-primaryColor text-[20px]">{title}</h3>
              <div className="flex gap-[5px] items-center">
                <HartIcon />
                <span className="text-[12px] text-textColor">{favoritesCount}</span>
              </div>
            </div>
            <div className="flex gap-[8px] items-center">
              {tagList?.map((tag, index) => {
                return <TagArticle tag={tag} key={index} />;
              })}
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-[18px] text-headingColor">{author.username}</span>
              <span className="text-textColorSecondary">{createdAt}</span>
            </div>
            <div className="w-[46px] h-[46px] rounded-full aspect-square flex items-center justify-center overflow-hidden">
              <img className="object-cover w-full h-full aspect-square" src={author.image} alt="user icon" />
            </div>
          </div>
        </div>
        <p className="text-[12px] text-textColor">{description}</p>
      </header>
      <main>
        <Markdown>{body}</Markdown>
      </main>
    </div>
  );
};
