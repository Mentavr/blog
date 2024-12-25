import { Link } from 'react-router-dom';
import { Button, ButtonProps } from '../Button/Button';
import { Form } from 'antd';

interface FormButtonProps extends ButtonProps {
  buttonName: string;
  navigate?: string;
  navigateDesc?: string;
  navigateLabel?: string;
  classNameWrapper?: string;
}

export const FormButton = ({
  classNameWrapper,
  navigate,
  navigateLabel,
  navigateDesc,
  buttonName,
  ...props
}: FormButtonProps) => {
  return (
    <Form.Item className={classNameWrapper}>
      <Button {...props}>{buttonName}</Button>
      {navigate && (
        <span className="text-[12px] text-[#8c8c8c] text-center">
          {navigateDesc}
          <Link className="text-primaryColor" to={navigate}>
            {navigateLabel}
          </Link>
          .
        </span>
      )}
    </Form.Item>
  );
};
