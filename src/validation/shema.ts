import { array, boolean, number, object, ref, string } from 'yup';

export const validation = {
  login: object({
    email: string()
      .email('Не верный email')
      .matches(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Не верный email')
      .required('Обязательное поле'),
    password: string()
      .min(6, 'Минимальная длина пароля — 6 символов')
      .max(40, 'Пароль не должен превышать 40 символов')
      .matches(/[a-zа-я]/i, 'Пароль должен содержать хотя бы одну строчную букву')
      .matches(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
      .required('Обязательное поле'),
  }),
  signUp: object({
    name: string().required('Обязательное поле'),
    email: string()
      .required('Обязательное поле')
      .matches(/^[^A-Z]*$/, 'Email не должен содержать заглавных букв')
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Не верный email'),
    password: string()
      .min(6, 'Минимальная длина пароля — 6 символов')
      .max(40, 'Пароль не должен превышать 40 символов')
      .matches(/[a-zа-я]/i, 'Пароль должен содержать хотя бы одну строчную букву')
      .matches(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
      .required('Обязательное поле'),
    confirm_password: string()
      .label('confirm password')
      .oneOf([ref('password')], 'Пароли должны быть одинаковы')
      .required('Обязательное поле'),
    info: boolean().oneOf([true], 'Вы должны принять условие').required('Обязательное поле'),
  }),
  profile: object({
    name: string().required('Обязательное поле'),
    email: string()
      .email('Не верный email')
      .matches(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Не верный email')
      .required('Обязательное поле'),
    password: string()
      .min(6, 'Минимальная длина пароля — 6 символов')
      .max(40, 'Пароль не должен превышать 40 символов')
      .matches(/[a-zа-я]/i, 'Пароль должен содержать хотя бы одну строчную букву')
      .matches(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
      .required('Обязательное поле'),
    avatar: string().required('Обязательное поле'),
  }),
  edit: object({
    title: string().required('Обязательное поле'),
    desc: string().required('Обязательное поле'),
    body: string().required('Обязательное поле'),
    tags: array().of(string()),
  }),
};
