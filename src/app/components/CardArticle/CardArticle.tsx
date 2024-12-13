import { HartIcon } from '@/assets/icons/HartIcon';
import { Link } from 'react-router-dom';
import { routs } from '@/utils/constant/routes';
import { TagArticle } from '..';
import { staticImg } from '@/utils/constant/staticImg';

interface ArticleProps {
  description: string;
  title: string;
  tags: string[];
  likes: number;
  userName: string;
  createDateArticle: string;
  userIcon: string;
  slug: string;
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
}: ArticleProps) => {
  return (
    <div className="pt-[15px] px-[14px] pb-[24px] shadow-[0 4px 12px 0 rgba(0, 0, 0, 0.15)] bg-backgroundColorBase rounded-[5px] flex flex-col gap-[12px]">
      <div className="flex gap-[4px] items-center justify-between">
        <div className="flex flex-col gap-[4px] max-w-[560px]">
          <div className="flex gap-[13px] items-center">
            <Link to={`${routs.ARTICLE}/${slug}`} className="max-w-[560px]">
              <h3 className="text-primaryColor text-[20px] break-words">{title}</h3>
            </Link>
            <div className="flex gap-[5px] items-center">
              <HartIcon />
              <span className="text-[12px] text-textColor">{likes}</span>
            </div>
          </div>
          <div className="flex gap-[8px] items-center max-w-[560px] flex-wrap">
            {tags?.map((tag, index) => {
              return <TagArticle tag={tag} key={index} />;
            })}
          </div>
        </div>
        <div className="flex items-center gap-[12px]">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[18px] text-headingColor">{userName}</span>
            <span className="text-textColorSecondary">{createDateArticle}</span>
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
