import { Checkbox, FormButton, Input } from '@/app/components';
import { useGetSingUpMutation } from '@/store/slices/api/userApi';
import { routs } from '@/utils/constant/routes';
import { useAuth } from '@/utils/hooks/useAuth';
import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useCookies } from 'react-cookie';
import { errorsApiMessage } from '@/utils/constant/errors';
import { sessionStore } from '@/utils/helpers/sessionStore';

interface FormType {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  info: boolean;
}

interface IError extends Error {
  status: number | string;
}
export const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation.signUp) });

  const [_, setCookie] = useCookies(['authToken']);
  const [singUp, { isLoading }] = useGetSingUpMutation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setElemToSessionStorage } = sessionStore();

  const onSubmit = async (data: FormType) => {
    const { name, email, password } = data;

    try {
      const data = await singUp({
        user: {
          username: name,
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

      if (status === errorsApiMessage.FETCH_ERROR.name) {
        toast.error(errorsApiMessage.FETCH_ERROR.message);
      }

      if (status === errorsApiMessage[422].name) {
        toast.error(errorsApiMessage[422].message.signUp);
      }
    }
  };

  return isLoading ? (
    <Spin className="absolute inset-0 top-2/4" size="large" />
  ) : (
    <div className="py-[48px] px-[32px] max-w-[384px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] mb-[239px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">Create new account</h1>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <Input placeholder="Username" labelInput="Username" control={control} errors={errors} nameInput="name" />

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

        <Input
          placeholder="Password"
          labelInput="Repeat Password"
          control={control}
          errors={errors}
          nameInput="confirm_password"
          type="password"
        />

        <Checkbox control={control} errors={errors} nameInput="info" defaultValue={false} />

        <FormButton
          classNameWrapper="mb-[0]"
          className="mb-[8px]"
          variant="solid"
          color="primary"
          htmlType="submit"
          buttonName="Create"
          navigateLabel="Sign In"
          navigateDesc={'Already have an account? '}
          navigate={routs.LOGIN}
          disabled={isLoading}
        />
      </Form>
    </div>
  );
};
