import styles from './Input.module.css';
import { IFormValues } from '@/lib/types';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  label?: string;
  type: string;
  fieldname: string;
  placeholder?: string;
  register: UseFormRegister<IFormValues>;
  validate?: (value: string) => boolean | string;
  errors?: any;
};
export const Input = ({
  label,
  type,
  fieldname,
  placeholder,
  register,
  validate,
  errors,
}: InputProps) => (
  <div className={styles.input__element}>
    <label htmlFor={fieldname}>{label}</label>
    <input
      type={type}
      id={fieldname}
      placeholder={placeholder}
      maxLength={30}
      autoComplete="off"
      {...register(fieldname, {
        required: { value: true, message: 'Field is required' },
        validate: validate,
      })}
    />
    {errors && <p className={styles.input__errorMessage}>{errors[fieldname]?.message}</p>}
  </div>
);
