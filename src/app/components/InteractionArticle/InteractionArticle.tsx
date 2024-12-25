import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { generateUniqueId } from '@/utils/helpers/generateUniqueId';
import { useCreateArticleMutation, useUpdateArticleMutation } from '@/store/slices/api/articleApi';
import { routs } from '@/utils/constant/routes';
import { toast } from 'react-toastify';
import { sessionStore } from '@/utils/helpers/sessionStore';
import { localStore } from '@/utils/helpers/localStorage';
import { FormButton, Input } from '..';
import { AddTags } from './components/AddTags';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(validation.edit),
    defaultValues: {
      title: title,
      desc: desc,
      tags: tags,
      body: body,
    },
    mode: 'onTouched',
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
  }, [tagsArticle, watch('title'), watch('desc'), watch('body')]);

  return isLoadingCreate || isLoadingUpdate ? (
    <Spin className="absolute inset-0 top-2/4" size="large" />
  ) : (
    <div className="py-[48px] px-[32px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] mb-[239px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">
        {slug ? 'Edit article' : 'Create new article'}
      </h1>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <Input
          placeholder="Title"
          control={control}
          errors={errors}
          nameInput="title"
          labelInput="Title"
          slug={slug}
          setProperty={setProperty}
          valuesForm={getValues()}
        />

        <Input
          placeholder="Short description"
          control={control}
          errors={errors}
          nameInput="desc"
          labelInput="Short description"
          slug={slug}
          setProperty={setProperty}
          valuesForm={getValues()}
        />

        <Input
          placeholder="Text"
          control={control}
          errors={errors}
          nameInput="body"
          labelInput="Text"
          type="textArea"
          slug={slug}
          setProperty={setProperty}
          valuesForm={getValues()}
        />

        <AddTags tagsArticle={tagsArticle} setTagsArticle={setTagsArticle} errors={errors as FieldErrors<FormType>} />

        <FormButton
          classNameWrapper="mb-[0] max-w-[320px]"
          className="mb-[8px] w-full"
          variant="solid"
          color="primary"
          htmlType="submit"
          buttonName="Send"
          disabled={isLoadingCreate || isLoadingUpdate}
        />
      </Form>
    </div>
  );
};
