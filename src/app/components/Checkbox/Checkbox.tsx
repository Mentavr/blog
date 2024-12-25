import { Form, Checkbox as AntCheckbox } from 'antd';
import { Control, Controller, FieldErrors, FieldValues, Noop, Path, PathValue, RefCallBack } from 'react-hook-form';

interface ICheckboxProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  nameInput: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
}

// interface IFieldTypes {
//   field: {
//     onChange: (...event: any[]) => void;
//     onBlur: Noop;
//     value: boolean;
//     disabled: boolean | undefined;
//     name: string;
//     ref: RefCallBack;
//   };
// }

export const Checkbox = <T extends FieldValues>({ control, errors, nameInput, defaultValue }: ICheckboxProps<T>) => {
  return (
    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Controller
        name={nameInput}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const { onChange, value, ...rest } = field;
          return (
            <div className="flex items-start gap-[8px]">
              <AntCheckbox id="info" {...rest} checked={!!value} onChange={(e) => onChange(e.target.checked)} />
              <label className="text-start w-full" htmlFor="info">
                I agree to the processing of my personal information
              </label>
            </div>
          );
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
