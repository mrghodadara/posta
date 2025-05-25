import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    helperText?: string;
}

export const TextArea = ({
    label,
    error,
    helperText,
    className = '',
    ...props
}: TextAreaProps) => {
    return (
        <div>
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>
            <textarea
                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-2 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
}; 