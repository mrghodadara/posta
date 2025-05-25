'use client';
import { GoogleButton } from '@/components/button/GoogleButton';
import { Button } from '@/components/button/Index';
import { Input } from '@/components/form/Input';
import { PasswordInput } from '@/components/form/PasswordInput';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { Spinner } from '@/components/loader/Spinner';
import { useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import * as Yup from 'yup';

const Index = () => {
  const [loginError, setLoginError] = useState<string | null>(null);

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
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email('Invalid Email').required('Required'),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
          'Password must be at least 6 characters long and include letters, numbers, and special characters.'
        ),
    }),
    onSubmit: (
      { email, password },
      { setSubmitting, resetForm, setFieldError }
    ) => {
      setSubmitting(true);
      setLoginError(null);
    },
  });

  return (
    <div className="min-h-[100dvh] w-full grid grid-cols-2">
      {/* Left side - Sign in form */}
      <div className="flex w-full flex-1 items-center justify-center bg-white px-4 py-8 sm:px-8">
        <div className="w-full max-w-lg">
          {/* Form */}
          <div className="rounded-xl bg-white p-6 shadow-authBox">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Welcome Back
            </h2>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-y-4"
            >
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

              <PasswordInput
                label="Password"
                id="password"
                name="password"
                placeholder="Password"
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

              <div className="text-right !mt-1">
                <Link
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 "
                  href={'/forgot-password'}
                >
                  Forgot password?
                </Link>
              </div>

              {loginError && (
                <p className="text-sm font-medium text-red-600">{loginError}</p>
              )}

              <div className="space-y-6">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Sign In'}
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

                <GoogleButton type="SIGN-IN" />
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {`Don't have an account?`}{' '}
                <Link
                  className="font-medium text-blue-600 hover:text-blue-700"
                  href={'/sign-up'}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Content with Background Image */}
      <div className="relative hidden lg:block">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/auth-bg.jpg")',
          }}
        >
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-12 text-white">
          <div className="max-w-lg text-center">
            <h2 className="mb-6 text-4xl font-bold drop-shadow-lg">
              Share Your Stories with the World
            </h2>
            <p className="mb-8 text-lg leading-relaxed drop-shadow-md">
              Join our community of writers and readers. Create, share, and
              discover amazing content.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="drop-shadow-md">
                  Write and publish your stories
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="drop-shadow-md">
                  Connect with fellow writers
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="drop-shadow-md">Build your audience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
