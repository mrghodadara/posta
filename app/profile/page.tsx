'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/button/Index';
import { TextInput } from '@/components/input/TextInput';
import { ImageUpload } from '@/components/input/ImageUpload';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function Profile() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<ImageFile[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Only validate password fields if any of them are filled
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.currentPassword) {
        newErrors.currentPassword =
          'Current password is required to change password';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters long';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData();
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);

      if (formData.currentPassword) {
        submitData.append('currentPassword', formData.currentPassword);
        submitData.append('newPassword', formData.newPassword);
      }

      if (profileImage.length > 0) {
        submitData.append('profileImage', profileImage[0].file);
      }

      // TODO: Implement profile update logic with FormData
      console.log('Updating profile:', submitData);

      // Clear password fields after successful update
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Profile Settings
              </h1>
              <p className="text-xl text-gray-600">
                Update your personal information and preferences
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={errors.firstName}
                  />

                  <TextInput
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={errors.lastName}
                  />
                </div>

                <ImageUpload
                  label="Profile Picture"
                  value={profileImage}
                  onChange={setProfileImage}
                  maxFiles={1}
                  maxSize={5}
                  helperText="Upload a profile picture (PNG, JPG, GIF up to 5MB)"
                />

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Change Password
                  </h2>
                  <div className="space-y-6">
                    <TextInput
                      label="Current Password"
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      error={errors.currentPassword}
                    />

                    <TextInput
                      label="New Password"
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      error={errors.newPassword}
                    />

                    <TextInput
                      label="Confirm New Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-white text-gray-900 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
