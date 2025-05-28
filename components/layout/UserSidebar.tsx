'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth.context';
import { UserIcon } from '@/components/icons/UserIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { PostIcon } from '@/components/icons/PostIcon';
import { SettingsIcon } from '@/components/icons/SettingsIcon';
import { LogoutIcon } from '@/components/icons/LogoutIcon';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export const UserSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, handleLogout } = useAuth();

    const navItems: NavItem[] = [
        {
            label: 'Home',
            href: '/',
            icon: <HomeIcon className="w-5 h-5" />,
        },
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
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserIcon className="w-8 h-8 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <button
                            key={item.href}
                            onClick={() => router.push(item.href)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
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
            </nav>
        </div>
    );
};
