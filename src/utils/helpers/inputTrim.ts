export const inputTrim = (e: any) => {
  if (e.target.value === ' ') {
    e.target.value = '';
  }
};
