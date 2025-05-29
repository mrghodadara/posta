'use client';

import { Button } from '@/components/button/Index';
import { useAuth } from '@/contexts/auth.context';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/form/Input';
import { Spinner } from '@/components/loader/Spinner';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { UserAPI } from '@/http/user';

export default function Profile() {
  const { user, setUser } = useAuth();

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
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().trim().required('Required'),
      lastName: Yup.string().trim().required('Required'),
    }),
    onSubmit: ({ firstName, lastName }, { setSubmitting }) => {
      setSubmitting(true);

      UserAPI.updateUser({ firstName, lastName })
        .then((response) => {
          if (response?.status === 200) {
            setUser(response?.data?.data?.user);
            toast.success(response?.data?.data?.message);
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
    <>
      <div className="p-6">
        <div className="space-y-6">
          <h1 className="text-xl font-medium text-gray-700">
            Profile Settings
          </h1>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="gap-4 grid grid-cols-2"
          >
            {/* <ImageUpload
              label="Profile Picture"
              value={profileImage}
              onChange={setProfileImage}
              maxFiles={1}
              maxSize={5}
              helperText="Upload a profile picture (PNG, JPG, GIF up to 5MB)"
            /> */}

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
                touched?.firstName && errors?.firstName ? errors?.firstName : ''
              }
              icon={<UserIcon />}
            />

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

            <Input
              label="Email"
              id="email"
              name="email"
              type="text"
              value={user?.email}
              className="border-gray-10 cursor-not-allowed text-opacity-70"
              icon={<EmailIcon />}
              disabled
            />

            <div className="col-span-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="max-w-28"
              >
                {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
