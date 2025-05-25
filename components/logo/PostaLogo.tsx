import React from 'react';

interface PostaLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const PostaLogo: React.FC<PostaLogoProps> = ({ className = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    return (
        <div className={`${sizeClasses[size]} ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Background Circle */}
                <circle cx="50" cy="50" r="45" fill="url(#gradient)" />

                {/* Letter P */}
                <path
                    d="M35 25H55C62.1797 25 68 30.8203 68 38C68 45.1797 62.1797 51 55 51H45V75H35V25Z"
                    fill="white"
                />

                {/* Envelope Symbol */}
                <path
                    d="M45 51H55C62.1797 51 68 56.8203 68 64C68 71.1797 62.1797 77 55 77H45C37.8203 77 32 71.1797 32 64C32 56.8203 37.8203 51 45 51Z"
                    fill="white"
                    fillOpacity="0.8"
                />

                {/* Gradient Definition */}
                <defs>
                    <linearGradient
                        id="gradient"
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="100"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export { PostaLogo }; 