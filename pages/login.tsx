import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import styles from '@/styles/login.module.css';
import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getUserFromSession } from '@/lib/auth/user';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { IFormValues } from '@/lib/types';
import { enqueueSnackbar } from 'notistack';
import { isValidUsername } from '@/lib/validators/isValidUsername';

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    reset();
    try {
      await axios.post('/api/login', data);
      Router.push('/admin');
    } catch (error) {
      enqueueSnackbar('Invalid username or password', { variant: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Login to admin account" />
      </Head>
      <div className={styles.container}>
        <h2>Login to admin account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Username:"
            type="text"
            fieldname="username"
            register={register}
            validate={(name) => isValidUsername(name)}
            errors={errors}
          />
          <Input
            label="Password:"
            type="password"
            fieldname="password"
            register={register}
            errors={errors}
          />
          <Button type="submit">Login</Button>
        </form>
        <Link className={styles.backward_button} href="/">
          Back to main page
        </Link>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUserFromSession(req);
  if (user) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
