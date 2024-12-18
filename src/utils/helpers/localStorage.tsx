export const localStore = () => {
  const getElemToLocalStorage = (name: string) => {
    const elem = localStorage.getItem(name);
    return elem ? JSON.parse(elem) : null;
  };

  const removeElemToLocalStorage = (name: string) => {
    localStorage.removeItem(name);
  };

  const setElemToLocalStorage = (name: string, elem: string | number) => {
    localStorage.setItem(name, String(elem));
  };

  return { getElemToLocalStorage, removeElemToLocalStorage, setElemToLocalStorage };
};
