import { LikeArticle, TagArticle } from '..';
import Markdown from 'react-markdown';
import { formatDate } from '@/utils/helpers/formatDate';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import cls from './style.module.css';
import { localStore } from '@/utils/helpers/localStorage';
import { PopoversButtons } from './components/PopoversButtons';
import { ArticleType } from '@/store/slices/types.slices';

interface ArticleProps {
  data: ArticleType;
}

export const Article = ({ data }: ArticleProps) => {
  const { removeElemToLocalStorage } = localStore();

  removeElemToLocalStorage('createArticleOptions');
  removeElemToLocalStorage('editArticleOptions');

  const { title, description, body, tagList, createdAt, favorited, favoritesCount, author, slug } = data;

  return (
    <article className="w-full px-[16px] pt-[15px] pb-[100px] bg-backgroundColorBase shadow-custom mt-[26px] closePop">
      <header className="flex gap-[4px] flex-col mb-[25px]">
        <div className="flex gap-[4px] items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-[13px] items-center">
              <h3 className="text-primaryColor text-[20px] break-words">{title}</h3>
              <LikeArticle favorited={favorited} likes={favoritesCount} slug={slug} />
            </div>
            <div className="flex gap-[8px] items-center">
              {tagList?.map((tag, index) => {
                return <TagArticle tag={tag} key={index} />;
              })}
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="flex flex-col gap-[2px] items-end">
              <span className="text-[18px] text-headingColor">{author.username}</span>
              <span className="text-textColorSecondary">{formatDate(createdAt)}</span>
            </div>
            <div className="w-[46px] h-[46px] rounded-full aspect-square flex items-center justify-center overflow-hidden">
              <img className="object-cover w-full h-full aspect-square" src={author.image} alt="user icon" />
            </div>
          </div>
        </div>
        <div className="flex gap-[12px] justify-between mt-[20px] items-center">
          <p className="text-[12px] text-textColor">{description}</p>
          <PopoversButtons slug={slug} />
        </div>
      </header>
      <main className="flex gap-[12px] flex-col">
        <Markdown
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw]}
          components={{
            ul: ({ node, ...props }) => <ul className={cls.ulCls} {...props} />,
            ol: ({ node, ...props }) => <ol className={cls.olCls} {...props} />,
            li: ({ node, ...props }) => <li className={cls.liCls} {...props} />,
            h2: ({ node, ...props }) => <h2 className={cls.h2Cls} {...props} />,
            h3: ({ node, ...props }) => <h3 className={cls.h3Cls} {...props} />,
            h4: ({ node, ...props }) => <h4 className={cls.h4Cls} {...props} />,
            h5: ({ node, ...props }) => <h5 className={cls.h5Cls} {...props} />,
            h6: ({ node, ...props }) => <h6 className={cls.h6Cls} {...props} />,
            // img: ({ node, ...props }) => <img className="imgCls" {...props} />,
          }}
        >
          {body}
        </Markdown>
      </main>
    </article>
  );
};
