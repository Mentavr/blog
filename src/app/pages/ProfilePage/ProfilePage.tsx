import { FormButton, Input } from '@/app/components';
import { useUpdateUserMutation } from '@/store/slices/api/userApi';
import { errorsApiMessage } from '@/utils/constant/errors';
import { routs } from '@/utils/constant/routes';
import { sessionStore } from '@/utils/helpers/sessionStore';
import { validation } from '@/utils/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { useForm } from 'react-hook-form';
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
  const { setElemToSessionStorage } = sessionStore();

  const onSubmit = async (data: FormType) => {
    const { email, name, password, avatar } = data;
    const requestObjectWithAvatar = { email: email, username: name, password: password, image: avatar };
    const requestObjectWithOutAvatar = { email: email, username: name, password: password };

    try {
      await updateUser(avatar ? requestObjectWithAvatar : requestObjectWithOutAvatar).unwrap();
      navigate(routs.ARTICLE);
      setElemToSessionStorage('page', 1);
      setElemToSessionStorage('limit', 10);
      setElemToSessionStorage('offset', 0);
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
        <Input placeholder="Username" labelInput="Username" control={control} errors={errors} nameInput="name" />

        <Input
          placeholder="Email address"
          labelInput="Email address"
          control={control}
          errors={errors}
          nameInput="email"
        />

        <Input
          placeholder="New password"
          labelInput="New password"
          control={control}
          errors={errors}
          nameInput="password"
          type="password"
        />

        <Input
          placeholder="Avatar image"
          labelInput="Avatar image"
          control={control}
          errors={errors}
          nameInput="avatar"
        />

        <FormButton
          classNameWrapper="mb-[0]"
          className="mb-[8px]"
          variant="solid"
          color="primary"
          htmlType="submit"
          buttonName="Save"
        />
      </Form>
    </div>
  );
};
