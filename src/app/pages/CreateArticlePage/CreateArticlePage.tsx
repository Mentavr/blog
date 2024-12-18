import { InteractionArticle } from '@/app/components';
import { localStore } from '@/utils/helpers/localStorage';

export const CreateArticlePage = () => {
  const { setElemToLocalStorage, getElemToLocalStorage } = localStore();
  const storageValue = getElemToLocalStorage('createArticleOptions');

  if (!storageValue) {
    setElemToLocalStorage(
      'createArticleOptions',
      JSON.stringify({
        desc: '',
        title: '',
        tags: [],
        body: '',
      })
    );
  }
  return <InteractionArticle />;
};
