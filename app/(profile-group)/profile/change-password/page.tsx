'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/button/Index';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PasswordInput } from '@/components/form/PasswordInput';
import { Spinner } from '@/components/loader/Spinner';
import { AuthAPI } from '@/http/auth';

export default function ChangePassword() {
  const router = useRouter();

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
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
          'Password must be at least 6 characters long and include letters, numbers, and special characters.'
        ),
      newPassword: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
          'Password must be at least 6 characters long and include letters, numbers, and special characters.'
        ),
    }),
    onSubmit: (
      { currentPassword, newPassword },
      { setSubmitting, resetForm }
    ) => {
      setSubmitting(true);

      AuthAPI.changePassword({ currentPassword, newPassword })
        .then((response) => {
          if (response?.status === 201) {
            toast.success(response?.data?.data?.message);
            router.push('/profile');
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
    <div className="p-6">
      <div className="max-w-xl space-y-6">
        <h1 className="text-xl font-medium text-gray-700">Change Password</h1>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="gap-5 grid grid-cols-2"
        >
          <div className="col-span-2">
            <PasswordInput
              label="Current Password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter current password"
              value={values?.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched?.currentPassword && errors?.currentPassword
                  ? errors?.currentPassword
                  : ''
              }
            />
          </div>

          <div className="col-span-2">
            <PasswordInput
              label="New Password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={values?.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched?.newPassword && errors?.newPassword
                  ? errors?.newPassword
                  : ''
              }
            />
          </div>

          <div className="col-span-2">
            <PasswordInput
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter confirm password"
              value={values?.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched?.confirmPassword && errors?.confirmPassword
                  ? errors?.confirmPassword
                  : ''
              }
            />
          </div>

          <div className="col-span-2">
            <Button type="submit" disabled={isSubmitting} className="max-w-28">
              {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
