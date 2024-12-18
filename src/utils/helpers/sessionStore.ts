export const sessionStore = () => {
  const getElemToSessionStorage = (name: string) => {
    const elem = sessionStorage.getItem(name);
    return elem ? JSON.parse(elem) : null;
  };

  const removeElemToSessionStorage = (name: string) => {
    sessionStorage.removeItem(name);
  };

  const setElemToSessionStorage = (name: string, elem: string | number) => {
    sessionStorage.setItem(name, String(elem));
  };

  return { getElemToSessionStorage, removeElemToSessionStorage, setElemToSessionStorage };
};
