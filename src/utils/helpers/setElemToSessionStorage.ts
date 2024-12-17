export const setElemToSessionStorage = (name: string, elem: string | number) => {
  sessionStorage.setItem(name, String(elem));
};
