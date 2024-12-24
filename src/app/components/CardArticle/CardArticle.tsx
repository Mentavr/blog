import { Link } from 'react-router-dom';
import { routs } from '@/utils/constant/routes';
import { LikeArticle, TagArticle } from '..';
import { formatDate } from '@/utils/helpers/formatDate';

interface ArticleProps {
  description: string;
  title: string;
  tags: string[];
  likes: number;
  userName: string;
  createDateArticle: string;
  userIcon: string;
  slug: string;
  favorited: boolean;
  isLoadingArticles?: boolean;
}

export const CardArticle = ({
  description,
  title,
  tags,
  likes,
  userName,
  createDateArticle,
  userIcon,
  slug,
  favorited,
}: ArticleProps) => {
  return (
    <div className="pt-[15px] px-[14px] pb-[24px] bg-backgroundColorBase rounded-[5px] flex flex-col gap-[12px] shadow-custom">
      <div className="flex gap-[4px] items-center justify-between">
        <div className="flex flex-col gap-[4px] max-w-[560px]">
          <div className="flex gap-[13px] items-center">
            <Link to={`${routs.ARTICLE}/${slug}`} className="max-w-[560px]">
              <h3 className="text-primaryColor text-[20px] break-words">{title}</h3>
            </Link>
            <LikeArticle favorited={favorited} likes={likes} slug={slug} />
          </div>
          <div className="flex gap-[8px] items-center max-w-[560px] flex-wrap">
            {tags?.map((tag, index) => {
              return <TagArticle tag={tag} key={index} />;
            })}
          </div>
        </div>
        <div className="flex items-center gap-[12px]">
          <div className="flex items-end flex-col gap-[2px]">
            <span className="text-[18px] text-headingColor">{userName}</span>
            <span className="text-textColorSecondary">{formatDate(createDateArticle)}</span>
          </div>
          <div className="w-[46px] h-[46px] rounded-full aspect-square flex items-center justify-center overflow-hidden">
            <img className="object-cover w-full h-full aspect-square" src={userIcon} alt="user icon" />
          </div>
        </div>
      </div>
      <p className="text-[12px] text-textColor break-words">{description}</p>
    </div>
  );
};
