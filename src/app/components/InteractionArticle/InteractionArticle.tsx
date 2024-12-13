import { validation } from '@/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AddTag } from './components/AddTag';
import { inputTrim } from '@/utils/helpers/inputTrim';
import { generateUniqueId } from '@/utils/helpers/generateUniqueId';
import { useCreateArticleMutation } from '@/store/slices/api/articleApi';
import { routs } from '@/utils/constant/routes';

interface FormType {
  title: string;
  desc: string;
  body: string;
  tags?: TagsArticleType[];
}

interface InteractionArticleProps {
  description?: string;
  title?: string;
  tags?: string[];
  body?: string;
  slug?: string;
}
export interface TagsArticleType {
  nameTag: string;
  idArticle: string;
}

export const InteractionArticle = ({ description, title, tags, slug, body }: InteractionArticleProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(validation.edit) });
  const navigate = useNavigate();

  const tagsArticleArray = tags
    ? tags.map((elem) => ({ nameTag: elem, idArticle: generateUniqueId() }))
    : [{ nameTag: '', idArticle: generateUniqueId() }];

  const [tagsArticle, setTagsArticle] = useState<TagsArticleType[]>(tagsArticleArray);

  const [createArticle, {}] = useCreateArticleMutation();

  const onSubmit = async (data: FormType) => {
    console.log('data ==>> !!', data);
    const { title, desc, body, tags } = data;
    console.log(tags);
    try {
      createArticle({
        title: title,
        description: desc,
        body: body,
        tagList: tags,
      });
      navigate(routs.ARTICLE);
    } catch (error) {}
  };

  useEffect(() => {
    const tagsStringArticle = tagsArticle.map(({ nameTag }) => nameTag).filter((elem) => elem.length > 0);
    setValue('tags', tagsStringArticle);
  }, [tagsArticle]);

  //   return isLoading ? (
  //     <Spin className='absolute inset-0 top-2/4' size="large" />
  //   ) : (
  return (
    <div className="py-[48px] px-[32px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] mb-[239px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">Create new account</h1>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <Form.Item className="mb-[20px]" label="Title">
          <Controller
            name="title"
            control={control}
            defaultValue={title ? title : ''}
            render={({ field }) => (
              <Input
                onInput={(e) => inputTrim(e, field.value)}
                {...field}
                className="rounder-[4px]"
                size="large"
                placeholder="Title"
                status={errors.title && 'error'}
              />
            )}
          />
          {errors.title && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.title.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[20px]" label="Short description">
          <Controller
            name="desc"
            control={control}
            defaultValue={description ? description : ''}
            render={({ field }) => (
              <Input
                {...field}
                onInput={(e) => inputTrim(e, field.value)}
                className="rounder-[4px]"
                size="large"
                placeholder="Short description"
                status={errors.desc && 'error'}
              />
            )}
          />
          {errors.desc && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.desc.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[20px]" label="Text">
          <Controller
            name="body"
            control={control}
            defaultValue={body ? body : ''}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                onInput={(e) => inputTrim(e, field.value)}
                className="h-[40] rounder-[4px]"
                size="large"
                placeholder="Text"
                status={errors.body && 'error'}
              />
            )}
          />
          {errors.text && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.text.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[20px]" label="Tag">
          <div className="flex flex-col gap-[5px]">
            {tagsArticle.map(({ idArticle }) => {
              return (
                <div className="flex gap-[17px] ">
                  <AddTag idArticle={idArticle} setTagsArticle={setTagsArticle} tagsArticle={tagsArticle} />
                </div>
              );
            })}
          </div>
        </Form.Item>

        <Form.Item className="mb-[0] max-w-[320px]">
          <Button className="mb-[8px] w-full" variant="solid" color="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
