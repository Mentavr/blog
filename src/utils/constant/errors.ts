export const errorsApiMessage = {
  FETCH_ERROR: { name: 'FETCH_ERROR', message: 'Ошибка зароса, проверьте интернет соединение или выключите VPN' },
  422: {
    name: 422,
    message: {
      login: 'Проверьте введенный email или пароль',
      signUp: 'Пользователь с таким ником или email уже существует',
      profile: 'Пользователь с таким ником или email уже занят',
    },
  },
  403: { name: 403, message: 'У вас нет прав изменять или удалять этот пост' },
  401: { name: 401, message: 'Вы не авторизованы' },
};
