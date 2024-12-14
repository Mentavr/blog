import { format } from 'date-fns';

export const formatDate = (date: string | Date) => {
  if (!date) return null;
  return format(new Date(date), 'MMMM d, yyyy');
};
