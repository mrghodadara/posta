import { useRef } from 'react';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface ImageUploadProps {
  label: string;
  value: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  error?: string;
  helperText?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export const ImageUpload = ({
  label,
  value,
  onChange,
  error,
  helperText,
  maxFiles = 5,
  maxSize = 10,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check file count
    if (value.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    // Check file size and type
    const validFiles = Array.from(files).filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image`);
        return false;
      }
      return true;
    });

    const newImages = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
    }));

    onChange([...value, ...newImages]);
  };

  const removeImage = (id: string) => {
    const imageToRemove = value.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    onChange(value.filter((img) => img.id !== id));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-4">
        {/* Image Preview Grid */}
        {value.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {value.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200"
              >
                <img
                  src={image.preview}
                  alt="Preview"
                  // fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            error
              ? 'border-red-500 hover:border-red-600'
              : 'border-gray-200 hover:border-blue-500'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Upload images
              </span>{' '}
              or drag and drop
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
