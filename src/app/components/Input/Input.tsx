import { inputTrim } from '@/utils/helpers/inputTrim';
import { Form, Input as AntInput } from 'antd';
import { useCallback } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path, PathValue } from 'react-hook-form';

interface IInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  nameInput: Path<T>;
  placeholder: string;
  labelInput: string;
  type?: 'text' | 'password' | 'textArea';
  defaultValue?: PathValue<T, Path<T>>;
  slug?: string;
  setProperty?: (
    values: { title?: string; desc?: string; body?: string; tags?: string[] },
    slug: string | null
  ) => void;
  valuesForm?: FieldValues;
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
  setProperty,
  slug,
  valuesForm,
  type = 'text',
}: IInputProps<T>) => {
  const AntInputType = useCallback(({ field }: AntInputTypeProps) => {
    switch (type) {
      case 'text':
        return (
          <AntInput
            {...field}
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
            {...field}
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
            {...field}
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
        render={({ field }) => {
          if (setProperty && valuesForm) {
            setProperty(valuesForm, slug ? slug : null);
          }
          return <AntInputType field={field} />;
        }}
      />
      {errors[nameInput]?.message && (
        <span className="text-errorColor text-[14px] text-start w-full inline-block mt-[4px]">
          {String(errors[nameInput]?.message)}
        </span>
      )}
    </Form.Item>
  );
};
