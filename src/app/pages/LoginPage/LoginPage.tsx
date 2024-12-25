import { FormButton, Input } from '@/app/components';
import { useGetLoginUserMutation } from '@/store/slices/api/userApi';
import { errorsApiMessage } from '@/utils/constant/errors';
import { routs } from '@/utils/constant/routes';
import { sessionStore } from '@/utils/helpers/sessionStore';
import { useAuth } from '@/utils/hooks/useAuth';
import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Spin } from 'antd';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormType {
  email: string;
  password: string;
}

interface IError {
  status: string | number;
}

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(validation.login) });

  const [_, setCookie] = useCookies(['authToken']);

  const [signIn, { isLoading }] = useGetLoginUserMutation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setElemToSessionStorage } = sessionStore();

  const onSubmit = async (data: FormType) => {
    const { email, password } = data;
    try {
      const data = await signIn({
        user: {
          email: email,
          password: password,
        },
      }).unwrap();

      setCookie('authToken', data.user.token);
      login();
      navigate(routs.ARTICLE);
      setElemToSessionStorage('page', 1);
      setElemToSessionStorage('limit', 10);
      setElemToSessionStorage('offset', 0);
    } catch (error) {
      const { status } = error as IError;

      if (status === errorsApiMessage[422].name) {
        toast.error(errorsApiMessage[422].message.login);
      }

      if (status === errorsApiMessage.FETCH_ERROR.name) {
        toast.error(errorsApiMessage.FETCH_ERROR.message);
      }
    }
  };

  return isLoading ? (
    <Spin className="absolute inset-0 top-2/4" size="large" />
  ) : (
    <div className="py-[48px] px-[32px] max-w-[384px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">Sign In</h1>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <Input
          placeholder="Email address"
          labelInput="Email address"
          control={control}
          errors={errors}
          nameInput="email"
        />

        <Input
          placeholder="Password"
          labelInput="Password"
          control={control}
          errors={errors}
          nameInput="password"
          type="password"
        />

        <FormButton
          classNameWrapper="mb-[0]"
          className="mb-[8px]"
          variant="solid"
          color="primary"
          htmlType="submit"
          buttonName="Login"
          navigateLabel="Sign Up"
          navigateDesc={'Don’t have an account? '}
          navigate={routs.SIGNUP}
          disabled={isLoading}
        />
      </Form>
    </div>
  );
};
