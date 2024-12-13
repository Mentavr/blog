import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { TagsArticleType } from '../InteractionArticle';
import { generateUniqueId } from '@/utils/helpers/generateUniqueId';

interface AddTagProps {
  idArticle: string;
  setTagsArticle: (e: TagsArticleType[]) => void;
  tagsArticle: TagsArticleType[];
}

export const AddTag = ({ idArticle, tagsArticle, setTagsArticle }: AddTagProps) => {
  const [value, setValueInput] = useState<string>('');

  const isLast = tagsArticle[tagsArticle.length - 1].idArticle === idArticle;

  const handlerDeleteArticle = (id: string) => {
    const tagsArticleFilter = tagsArticle.filter(({ idArticle }) => {
      return idArticle !== id;
    });

    setTagsArticle(tagsArticleFilter);
  };

  const handlerAddArticle = () => {
    setTagsArticle([...tagsArticle, { nameTag: value, idArticle: generateUniqueId() }]);
  };

  useEffect(() => {
    const tagsArticleFilter = tagsArticle.map((elem) => {
      if (elem.idArticle === idArticle) {
        return { nameTag: value, idArticle: idArticle };
      }
      return elem;
    });
    setTagsArticle(tagsArticleFilter);
  }, [value]);

  return (
    <div className="flex gap-[17px] w-full">
      <Input
        value={value}
        onChange={(e) => setValueInput(e.target.value)}
        className="h-[40px] rounder-[4px] max-w-[300px]"
        size="large"
        placeholder="Tag"
      />
      <div className="flex gap-[17px]">
        <Button
          className="w-[118px] h-[40px]"
          variant="outlined"
          color="danger"
          onClick={() => handlerDeleteArticle(idArticle)}
          disabled={tagsArticle.length <= 1}
        >
          Delete
        </Button>

        {isLast && (
          <Button className="w-[118px] h-[40px]" variant="outlined" color="primary" onClick={handlerAddArticle}>
            Add tag
          </Button>
        )}
      </div>
    </div>
  );
};
