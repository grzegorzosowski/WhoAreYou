import styles from './UserForm.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import { isValidName } from '@/lib/validators/isValidName';
import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import {
  IFormValues,
  UserGenderDataWithoutCount,
  UserNationalityDataWithoutCount,
} from '@/lib/types';
import { Input } from '../Input/Input';
import { enqueueSnackbar } from 'notistack';

type Props = {
  setUserGenderData: (data: UserGenderDataWithoutCount | undefined) => void;
  setUserNationalityData: (data: UserNationalityDataWithoutCount | undefined) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const UserForm = ({ setUserGenderData, setUserNationalityData, setIsLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormValues>();

  useEffect(() => {
    if (!isSubmitting) {
      if (errors.name) {
        const errorMessage = errors.name.message as string;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    }
  }, [isSubmitting]);

  const onSubmit = async (data: IFormValues) => {
    const { name } = data;
    if (!isValidName(name)) {
      enqueueSnackbar('Name should contain only latin letters', { variant: 'error' });
      return;
    }
    setUserGenderData(undefined);
    setUserNationalityData(undefined);

    try {
      setIsLoading(true);
      const response = await axios.get('/api/getNameStats', { params: { name } });
      const { userGenderData, userNationalityData } = response.data;
      setUserGenderData(userGenderData as UserGenderDataWithoutCount);
      setUserNationalityData(userNationalityData as UserNationalityDataWithoutCount);
      reset();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setUserGenderData(undefined);
      setUserNationalityData(undefined);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__inputContainer}>
          <Input type="text" fieldname="name" register={register} />
          <Button className={styles.form__button} type="submit" disabled={isSubmitting}>
            Find out
          </Button>
        </div>
      </form>
    </>
  );
};
