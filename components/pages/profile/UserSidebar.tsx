'use client';

import { LogoutIcon } from '@/components/icons/LogoutIcon';
import { PostIcon } from '@/components/icons/PostIcon';
import { SettingsIcon } from '@/components/icons/SettingsIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { useAuth } from '@/contexts/auth.context';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const UserSidebar = () => {
  const router = useRouter();

  const pathname = usePathname();
  const { user, handleLogout } = useAuth();

  const navItems: NavItem[] = [
    {
      label: 'My Posts',
      href: '/profile/posts',
      icon: <PostIcon className="w-5 h-5" />,
    },
    {
      label: 'Profile Settings',
      href: '/profile',
      icon: <SettingsIcon className="w-5 h-5" />,
    },
    {
      label: 'Change Password',
      href: '/profile/change-password',
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col items-center p-5 border-b border-gray-200">
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <UserIcon className="w-16 h-16 text-gray-400" />
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          {user?.firstName} {user?.lastName}
        </h2>

        <p className="text-gray-600">{user?.email}</p>
      </div>

      <nav className="space-y-1  py-5 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="font-medium">Delete Account</span>
        </button>
      </nav>
    </div>
  );
};

export { UserSidebar };
