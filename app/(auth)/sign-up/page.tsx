'use client';
import { GoogleButton } from '@/components/button/GoogleButton';
import { Button } from '@/components/button/Index';
import { Input } from '@/components/form/Input';
import { PasswordInput } from '@/components/form/PasswordInput';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { Logo } from '@/components/icons/Logo';
import { UserIcon } from '@/components/icons/UserIcon';
import { Spinner } from '@/components/loader/Spinner';
import { useAuth } from '@/contexts/auth.context';
import { AuthAPI } from '@/http/auth';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const Index = () => {
  const { setUser } = useAuth();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().trim().required('Required'),
      lastName: Yup.string().trim().required('Required'),
      email: Yup.string().trim().email('Invalid Email').required('Required'),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
          'Password must be at least 6 characters long and include letters, numbers, and special characters.'
        ),
    }),
    onSubmit: (
      { email, password, firstName, lastName },
      { setSubmitting, resetForm }
    ) => {
      setSubmitting(true);

      AuthAPI.signUp({ email, password, firstName, lastName })
        .then((response) => {
          console.log('response>>>', response);

          if (response?.status === 201) {
            setUser(response?.data?.user);
            localStorage.setItem('accessToken', response?.data?.accessToken);
            resetForm();
          }
        })
        .catch((error) => {
          console.log('error', error);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-white px-4 py-8 sm:px-8">
      <div className="w-full max-w-lg">
        {/* Form */}
        <div className="rounded-xl bg-white p-6 shadow-authBox">
          <div className="flex flex-col gap-2 justify-center items-center mb-6">
            <Logo />
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Account
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="gap-4 grid grid-cols-2"
          >
            <div>
              <Input
                label="First Name"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={values?.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` ${
                  touched?.firstName && errors?.firstName
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.firstName && errors?.firstName
                    ? errors?.firstName
                    : ''
                }
                icon={<UserIcon />}
              />
            </div>

            <div>
              <Input
                label="Last Name"
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={values?.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` ${
                  touched?.lastName && errors?.lastName
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.lastName && errors?.lastName ? errors?.lastName : ''
                }
                icon={<UserIcon />}
              />
            </div>

            <div className="col-span-2">
              <Input
                label="Email"
                id="email"
                name="email"
                type="text"
                placeholder="Your Email"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={` ${
                  touched?.email && errors?.email
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={touched?.email && errors?.email ? errors?.email : ''}
                icon={<EmailIcon />}
              />
            </div>

            <div className="col-span-2">
              <PasswordInput
                label="Password"
                id="password"
                name="password"
                placeholder="Create a Strong Password"
                value={values?.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  touched?.password && errors?.password
                    ? 'border-red-600'
                    : 'border-gray-10'
                }`}
                error={
                  touched?.password && errors?.password ? errors?.password : ''
                }
              />
            </div>

            <div className="space-y-6 col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Sign Up'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <GoogleButton type="SIGN-UP" />
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {`Don't have an account?`}{' '}
              <Link
                className="font-medium text-blue-600 hover:text-blue-700"
                href={'/sign-in'}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
