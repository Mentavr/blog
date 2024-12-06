import { Button } from '@/app/components';
import { Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="py-[48px] px-[32px] max-w-[384px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">Sign In</h1>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)}>
        <Form.Item className="mb-[20px]" label="Email address">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} className="rounder-[4px]" size="large" placeholder="Email address" />
            )}
          />
        </Form.Item>

        <Form.Item className="mb-[20px]" label="Password">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password {...field} className="h-[40] rounder-[4px]" size="large" placeholder="Password" />
            )}
          />
        </Form.Item>

        <Form.Item className="mb-[0]">
          <Button className="mb-[8px]" variant="solid" color="primary" htmlType="submit">
            Login
          </Button>
          <span className="text-[12px] text-[#8c8c8c] text-center">
            Don’t have an account?{' '}
            <Link className="text-primaryColor" to="/signUp">
              Sign Up
            </Link>
            .
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};
