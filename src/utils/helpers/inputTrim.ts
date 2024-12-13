export const inputTrim = (e: any, value?: string) => {
  if (!value) return;
  console.log(e.target.value[0]);
  if (e.target.value === ' ') {
    e.target.value = e.target.value.trim();
    value = e.target.value.trim();
  }
};
