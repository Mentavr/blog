import { number, object, string } from 'yup';

export const validation = {
  login: object({
    email: string().email(),
    password: string(),
  }),
  signUp: object({
    name: string(),
    email: string().email(),
    password: string(),
    repeatPassword: string(),
  }),
};
