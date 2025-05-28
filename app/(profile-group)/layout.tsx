import Header from '@/components/layout/Header';
import { UserSidebar } from '@/components/layout/UserSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posta - Share Your Thoughts',
  description:
    'A platform for sharing your thoughts, stories, and ideas with the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative py-8 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">
                Profile Settings
              </h1>
              <p className="text-base text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
              <div className="md:col-span-2 bg-white rounded-lg border shadow-md border-gray-200">
                <UserSidebar />
              </div>

              <div className="md:col-span-5 bg-white rounded-lg border shadow-md border-gray-200">
                {children}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
