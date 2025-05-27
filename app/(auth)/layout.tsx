import type { Metadata } from 'next';
import '../globals.css';
import { CheckIcon } from '@/components/icons/CheckIcon';

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
    <div className="min-h-[100dvh] w-full grid grid-cols-2">
      {/* Left side - Sign in form */}
      <div className="flex w-full flex-1 items-center justify-center bg-white px-4 py-4 sm:px-8">
        {children}
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
                <CheckIcon />
                <span className="drop-shadow-md">
                  Write and publish your stories
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon />
                <span className="drop-shadow-md">
                  Connect with fellow writers
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon />
                <span className="drop-shadow-md">Build your audience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
