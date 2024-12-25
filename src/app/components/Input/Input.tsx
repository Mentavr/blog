import { inputTrim } from '@/utils/helpers/inputTrim';
import { Form, Input as AntInput } from 'antd';
import { useCallback, useRef } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path, PathValue } from 'react-hook-form';

interface IInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  nameInput: Path<T>;
  placeholder: string;
  labelInput: string;
  type?: 'text' | 'password' | 'textArea';
  defaultValue?: PathValue<T, Path<T>>;
}

interface AntInputTypeProps {
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
    name: string;
    ref: React.Ref<any>;
  };
}

export const Input = <T extends FieldValues>({
  control,
  errors,
  nameInput,
  labelInput,
  placeholder,
  defaultValue,
  type = 'text',
}: IInputProps<T>) => {
  const AntInputType = useCallback(({ field }: AntInputTypeProps) => {
    const { ref, ...fields } = field;
    const refMyInput = useRef<any>(ref);
    const options = { ref: refMyInput, ...fields };
    switch (type) {
      case 'text':
        return (
          <AntInput
            {...options}
            onInput={inputTrim}
            className="rounder-[4px]"
            size="large"
            placeholder={placeholder}
            status={errors[nameInput]?.message && 'error'}
          />
        );

      case 'password':
        return (
          <AntInput.Password
            {...options}
            onInput={inputTrim}
            className="rounder-[4px]"
            size="large"
            placeholder={placeholder}
            status={errors[nameInput]?.message && 'error'}
          />
        );

      case 'textArea':
        return (
          <AntInput.TextArea
            {...options}
            onInput={inputTrim}
            className="rounder-[4px]"
            size="large"
            placeholder={placeholder}
            status={errors[nameInput]?.message && 'error'}
          />
        );
    }
  }, []);

  return (
    <Form.Item className="mb-[20px]" label={labelInput}>
      <Controller
        name={nameInput}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field }) => <AntInputType field={field} />}
      />
      {errors[nameInput]?.message && (
        <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
          {String(errors[nameInput]?.message)}
        </span>
      )}
    </Form.Item>
  );
};
