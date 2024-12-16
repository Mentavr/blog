import { Button } from '@/app/components';
import { useUpdateUserMutation } from '@/store/slices/api/userApi';
import { errorsApiMessage } from '@/utils/constant/errors';
import { routs } from '@/utils/constant/routes';
import { inputTrim } from '@/utils/helpers/inputTrim';
import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormType {
  email: string;
  name: string;
  password: string;
  avatar?: null | string;
}

interface IError {
  status: string | number;
}

export const ProfilePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation.profile) });

  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: FormType) => {
    const { email, name, password, avatar } = data;
    const requestObjectWithAvatar = { email: email, username: name, password: password, image: avatar };
    const requestObjectWithOutAvatar = { email: email, username: name, password: password };

    try {
      await updateUser(avatar ? requestObjectWithAvatar : requestObjectWithOutAvatar).unwrap();
      navigate(routs.ARTICLE);
    } catch (error) {
      const { status } = error as IError;

      if (status === errorsApiMessage[422].name) {
        toast.error(errorsApiMessage[422].message.profile);
      }

      if (status === errorsApiMessage.FETCH_ERROR.name) {
        toast.error(errorsApiMessage.FETCH_ERROR.message);
      }
    }
  };

  return (
    <div className="py-[48px] px-[32px] max-w-[384px] border border-normalColor rounded-[6px] bg-backgroundColorBase shadow-myShadow mx-auto mt-[59px] text-center">
      <h1 className="weight-500 text-[20px] text-[#262626] mb-[20px]">Edit Profile</h1>
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

        <Form.Item className="mb-[20px]" label="New password">
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
                placeholder="New password"
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

        <Form.Item className="mb-[20px]" label="Avatar image (url)">
          <Controller
            name="avatar"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ''}
                onInput={(e) => inputTrim(e, field.value)}
                className="h-[40] rounder-[4px]"
                size="large"
                placeholder="Avatar image"
                status={errors.avatar && 'error'}
              />
            )}
          />
          {errors.avatar && (
            <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
              {errors.avatar.message}
            </span>
          )}
        </Form.Item>

        <Form.Item className="mb-[0]">
          <Button className="mb-[8px]" variant="solid" color="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
