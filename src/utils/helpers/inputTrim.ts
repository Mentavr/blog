export const inputTrim = (e: any, value?: string | null) => {
  if (!value) return;

  if (e.target.value === ' ') {
    e.target.value = e.target.value.trim();
    value = e.target.value.trim();
  }
};
