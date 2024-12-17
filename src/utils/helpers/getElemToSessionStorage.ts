export const getElemToSessionStorage = (name: string) => {
  const elem = sessionStorage.getItem(name);
  return elem ? JSON.parse(elem) : null;
};
