import { Button } from '@/app/components';
import { useGetSingUpMutation } from '@/store/slices/api/userApi';
import { routs } from '@/utils/constant/routes';
import { useAuth } from '@/utils/hooks/useAuth';
import { validation } from '@/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useCookies } from 'react-cookie';
import { inputTrim } from '@/utils/helpers/inputTrim';
import { errorsApiMessage } from '@/utils/constant/errors';

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
        <Form.Item className="mb-[20px]" label="Username">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                onInput={(e) => inputTrim(e, field.value)}
                {...field}
                className="rounder-[4px]"
                size="large"
                placeholder="Username"
                status={errors.name && 'error'}
              />
            )}
          />
          {errors.name && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.name.message}
            </span>
          )}
        </Form.Item>

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

        <Form.Item className="mb-[20px]" label="Repeat Password">
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password
                {...field}
                onInput={(e) => inputTrim(e, field.value)}
                className="h-[40] rounder-[4px]"
                size="large"
                placeholder="Password"
                status={errors.confirm_password && 'error'}
              />
            )}
          />
          {errors.confirm_password && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.confirm_password.message}
            </span>
          )}
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Controller
            name="info"
            control={control}
            defaultValue={false}
            render={({ field }) => {
              const { onChange, value, ...rest } = field;
              return (
                <div className="flex items-start gap-[8px]">
                  <Checkbox id="info" {...rest} checked={value} onChange={(e) => onChange(e.target.checked)} />
                  <label className="text-start w-full" htmlFor="info">
                    I agree to the processing of my personal information
                  </label>
                </div>
              );
            }}
          />
          {errors.info && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.info.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[0]">
          <Button className="mb-[8px]" variant="solid" color="primary" htmlType="submit">
            Create
          </Button>
          <span className="text-[12px] text-[#8c8c8c] text-center">
            Already have an account?{' '}
            <Link className="text-primaryColor" to={routs.LOGIN}>
              Sign In
            </Link>
            .
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};
