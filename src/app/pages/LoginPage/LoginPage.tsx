import { Button } from '@/app/components';
import { useGetLoginUserMutation } from '@/store/slices/api/userApi';
import { errorsApiMessage } from '@/utils/constant/errors';
import { routs } from '@/utils/constant/routes';
import { inputTrim } from '@/utils/helpers/inputTrim';
import { useAuth } from '@/utils/hooks/useAuth';
import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, Spin } from 'antd';
import { useCookies } from 'react-cookie';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
  } = useForm({ resolver: yupResolver(validation.login) });

  const [_, setCookie] = useCookies(['authToken']);

  const [signIn, { isLoading }] = useGetLoginUserMutation();
  const { login } = useAuth();
  const navigate = useNavigate();

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
        <Form.Item className="mb-[20px]" label="Email address">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                onInput={(e) => inputTrim(e, field.value)}
                className="rounder-[4px]"
                size="large"
                placeholder="Email address"
                status={errors.email && 'error'}
              />
            )}
          />
          {errors.email && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.email.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[20px]" label="Password">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password
                {...field}
                onInput={(e) => inputTrim(e, field.value)}
                className="h-[40] rounder-[4px]"
                size="large"
                placeholder="Password"
                status={errors.password && 'error'}
              />
            )}
          />
          {errors.password && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.password.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[0]">
          <Button className="mb-[8px]" variant="solid" color="primary" htmlType="submit">
            Login
          </Button>
          <span className="text-[12px] text-[#8c8c8c] text-center">
            Don’t have an account?{' '}
            <Link className="text-primaryColor" to={routs.SIGNUP}>
              Sign Up
            </Link>
            .
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};
