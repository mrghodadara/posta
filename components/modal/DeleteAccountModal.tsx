import React, { useState } from 'react';
import { Button } from '../button/Index';
import { CloseIcon } from '../icons/CloseIcon';
import { AuthAPI } from '@/http/auth';
import { useAuth } from '@/contexts/auth.context';
import toast from 'react-hot-toast';
import { Spinner } from '../loader/Spinner';

interface DeleteAccountModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ isOpen, setIsOpen }: DeleteAccountModalProps) => {
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);

    AuthAPI.deleteAccount()
      .then((response) => {
        if (response?.status === 200) {
          toast.success(response?.data?.data?.message);
          handleLogout();
          handleClose();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity"
              onClick={() => handleClose()}
            />

            <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-md transition-all">
              <button
                onClick={() => handleClose()}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              >
                <CloseIcon />
              </button>

              <div className="mt-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Delete Account
                </h3>
                <p className="mt-2 text-gray-600">
                  Are you sure you want to delete your account? This action
                  cannot be undone and all your data will be permanently
                  deleted.
                </p>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  onClick={() => handleClose()}
                  className="w-20 sm:!w-auto !bg-none !text-gray-700 border border-gray-300 hover:!bg-gray-50"
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => handleDeleteAccount()}
                  disabled={isLoading}
                  className="!w-auto bg-gradient-to-r from-red-500 to-red-500 hover:from-red-600 hover:to-red-600"
                >
                  {isLoading ? <Spinner stroke="#FFFFFF" /> : 'Delete Account'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { DeleteAccountModal };
