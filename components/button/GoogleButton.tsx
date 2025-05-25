import React, { useState } from 'react';

import { Button } from './Index';
import { GoogleIcon } from '../icons/GoogleIcon';
import { Spinner } from '../loader/Spinner';

interface GoogleButtonProps {
  type?: 'SIGN-IN' | 'SIGN-UP';
}

const GoogleButton = ({ type }: GoogleButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = () => {
    setIsLoading(true);
  };

  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={() => handleSignInWithGoogle()}
      className="flex w-full items-center justify-center gap-3 border border-gray-10 bg-white text-gray-5 shadow-none hover:shadow-none transition-colors"
    >
      {isLoading ? (
        <Spinner stroke="#D0D7DE" />
      ) : (
        <>
          <GoogleIcon />
          {type === 'SIGN-IN' ? 'Sign in with Google' : 'Sign up with Google'}
        </>
      )}
    </Button>
  );
};

export { GoogleButton };
