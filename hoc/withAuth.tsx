'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth.context';
import { Spinner } from '@/components/loader/Spinner';

export function withAuth<P>(
  Component: React.ComponentType<P>,
  isAuthenticated = true
) {
  const AuthHOC = (props: P & React.JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const pathname = usePathname();

    const { isLoading, user } = useAuth();
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
      const routeCheck = async () => {
        if (isLoading) return;

        if (isAuthenticated) {
          if (user) {
            setIsPageLoading(false);
          }

          if (!user) {
            router.push('/signin');
          }
        } else {
          if (!user) {
            setIsPageLoading(false);
          }

          if (user) {
            router.push('/');
          }
        }
      };

      routeCheck();
    }, [user, isLoading, pathname, router]);

    if (isPageLoading || isLoading) {
      return (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner stroke="#1D7AFC" width={40} height={40} />
        </div>
      );
    }

    return <Component {...props} />;
  };

  return AuthHOC;
}
