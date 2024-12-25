import { Form } from 'antd';
import { AddTag } from './AddTag';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { TagsArticleType } from '../InteractionArticle';

interface AddTagsProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  tagsArticle: TagsArticleType[];
  setTagsArticle: (e: TagsArticleType[]) => void;
}

export const AddTags = <T extends FieldValues>({ errors, tagsArticle, setTagsArticle }: AddTagsProps<T>) => {
  return (
    <Form.Item className="mb-[20px]" label="Tag">
      <div className="flex flex-col gap-[5px]">
        {tagsArticle.map(({ nameTag, idArticle }, index) => {
          const errorMessage = errors.tags && Array.isArray(errors.tags) ? errors.tags[index]?.message : undefined;
          return (
            <div key={idArticle} className="flex gap-[17px] flex-col gap-[5px] text-start">
              <AddTag
                nameTag={nameTag}
                idArticle={idArticle}
                setTagsArticle={setTagsArticle}
                tagsArticle={tagsArticle}
              />
              {errorMessage && <span className="text-errorColor text-[14px] w-full">{String(errorMessage)}</span>}
            </div>
          );
        })}
      </div>
    </Form.Item>
  );
};
