import Link from 'next/link';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
    const sizes = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
    };

    return (
        <Link href="/" className={`font-bold text-blue-600 ${sizes[size]} ${className}`}>
            Posta
        </Link>
    );
};

export default Logo; 