import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AddTag } from './components/AddTag';
import { inputTrim } from '@/utils/helpers/inputTrim';
import { generateUniqueId } from '@/utils/helpers/generateUniqueId';
import { useCreateArticleMutation, useUpdateArticleMutation } from '@/store/slices/api/articleApi';
import { routs } from '@/utils/constant/routes';
import { toast } from 'react-toastify';
import { sessionStore } from '@/utils/helpers/sessionStore';
import { localStore } from '@/utils/helpers/localStorage';

interface FormType {
  title: string;
  desc: string;
  body: string;
  tags?: string[];
}

interface InteractionArticleProps {
  slug?: string;
}

interface IError {
  originalStatus: number | string;
  status: number | string;
}

export interface TagsArticleType {
  nameTag: string;
  idArticle: string;
}

export const InteractionArticle = ({ slug }: InteractionArticleProps) => {
  const { setElemToSessionStorage } = sessionStore();
  const { removeElemToLocalStorage, getElemToLocalStorage, setElemToLocalStorage } = localStore();

  const { desc, title, tags, body } = slug
    ? getElemToLocalStorage('editArticleOptions')
    : getElemToLocalStorage('createArticleOptions');
  console.log(desc);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validation.edit),
    defaultValues: {
      title: title,
      desc: desc,
      tags: tags,
      body: body,
    },
  });

  const navigate = useNavigate();

  const initialTagsArticleArray =
    tags.length > 0
      ? tags?.map((elem: any) => ({ nameTag: elem, idArticle: generateUniqueId() }))
      : [{ nameTag: '', idArticle: generateUniqueId() }];

  const [tagsArticle, setTagsArticle] = useState<TagsArticleType[]>(initialTagsArticleArray);

  const [createArticle, { isLoading: isLoadingCreate }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isLoadingUpdate }] = useUpdateArticleMutation();

  const onSubmit = async (data: FormType) => {
    const { title, desc, body, tags } = data;
    if (!slug) {
      try {
        await createArticle({
          title: title,
          description: desc,
          body: body,
          tagList: tags,
        });
        navigate(routs.ARTICLE);
        setElemToSessionStorage('page', 1);
        setElemToSessionStorage('limit', 10);
        setElemToSessionStorage('offset', 0);
        removeElemToLocalStorage('editArticleOptions');
        removeElemToLocalStorage('createArticleOptions');
      } catch (error) {
        const { status } = error as IError;

        if (status === 'FETCH_ERROR') {
          toast.error('Ошибка зароса, проверьте интернет соединение или выключите VPN');
        }

        if (status === 402) {
          navigate(-1);
          removeElemToLocalStorage('editArticleOptions');
          removeElemToLocalStorage('createArticleOptions');
          toast.error('У вас нет прав изменять этот пост');
        }
      }
    }
    if (slug) {
      try {
        await updateArticle({
          slug,
          params: {
            title: title,
            description: desc,
            body: body,
            tagList: tags,
          },
        }).unwrap();
        navigate(routs.ARTICLE);
        removeElemToLocalStorage('editArticleOptions');
        removeElemToLocalStorage('createArticleOptions');
      } catch (error) {
        const { originalStatus, status } = error as IError;

        if (status === 'FETCH_ERROR') {
          toast.error('Ошибка зароса, проверьте интернет соединение или выключите VPN');
        }

        if (originalStatus === 403) {
          toast.error('У вас нет прав изменять этот пост');
          navigate(-1);
          removeElemToLocalStorage('editArticleOptions');
          removeElemToLocalStorage('createArticleOptions');
        }
      }
    }
  };

  const setProperty = (
    values: { title?: string; desc?: string; body?: string; tags?: string[] },
    slug: string | null
  ) => {
    console.log('values', values);
    const valuesStorage = JSON.stringify({
      ...values,
    });
    slug
      ? setElemToLocalStorage('editArticleOptions', valuesStorage)
      : setElemToLocalStorage('createArticleOptions', valuesStorage);
  };

  useEffect(() => {
    const tagsStringArticle = tagsArticle.map(({ nameTag }) => nameTag).filter((elem) => elem.length > 0);
    setValue('tags', tagsStringArticle);
    setProperty(getValues(), slug ? slug : null);
  }, [tagsArticle]);

  return isLoadingCreate || isLoadingUpdate ? (
    <Spin className="absolute inset-0 top-2/4" size="large" />
  ) : (
    <div className="py-[48px] px-[32px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] mb-[239px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">
        {slug ? 'Edit article' : 'Create new account'}
      </h1>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <Form.Item className="mb-[20px]" label="Title">
          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              setProperty(getValues(), slug ? slug : null);
              return (
                <Input
                  {...field}
                  onInput={inputTrim}
                  className="rounder-[4px]"
                  size="large"
                  placeholder="Title"
                  status={errors.title && 'error'}
                />
              );
            }}
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
            render={({ field }) => {
              setProperty(getValues(), slug ? slug : null);
              return (
                <Input
                  {...field}
                  onInput={inputTrim}
                  className="rounder-[4px]"
                  size="large"
                  placeholder="Short description"
                  status={errors.desc && 'error'}
                />
              );
            }}
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
            render={({ field }) => {
              setProperty(getValues(), slug ? slug : null);
              return (
                <Input.TextArea
                  {...field}
                  onInput={inputTrim}
                  className="h-[40] rounder-[4px]"
                  size="large"
                  placeholder="Text"
                  status={errors.body && 'error'}
                />
              );
            }}
          />
          {errors.body && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.body.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[20px]" label="Tag">
          <div className="flex flex-col gap-[5px]">
            {tagsArticle.map(({ nameTag, idArticle }, index) => {
              const error = errors.tags?.[index]?.message;
              return (
                <div key={idArticle} className="flex gap-[17px] flex-col gap-[5px] text-start">
                  <AddTag
                    nameTag={nameTag}
                    idArticle={idArticle}
                    setTagsArticle={setTagsArticle}
                    tagsArticle={tagsArticle}
                  />
                  {error && <span className="text-errorColor text-[14px] w-full">{error}</span>}
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
