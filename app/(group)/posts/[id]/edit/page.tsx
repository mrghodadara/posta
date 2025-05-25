'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/button/Index';
import { TextInput } from '@/components/input/TextInput';
import { TextArea } from '@/components/input/TextArea';
import { ImageUpload } from '@/components/input/ImageUpload';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API response
        const mockPost = {
          title: 'Getting Started with Web Development',
          content:
            'Learn the fundamentals of web development and start your journey...',
          tags: 'Web Development, JavaScript',
          images: ['https://picsum.photos/800/400'],
        };

        setFormData({
          title: mockPost.title,
          content: mockPost.content,
          tags: mockPost.tags,
        });

        // Convert existing images to ImageFile format
        if (mockPost.images.length > 0) {
          setImages([
            {
              id: '1',
              file: new File([], 'existing-image.jpg'),
              preview: mockPost.images[0],
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to load post. Please try again.');
        router.push('/profile/posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('tags', formData.tags);

      // Only append new images
      images.forEach((image) => {
        if (image.file.size > 0) {
          // Only append if it's a new file
          submitData.append('images', image.file);
        }
      });

      // TODO: Implement post update logic with FormData
      console.log('Updating post:', submitData);
      router.push('/profile/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Edit Post
              </h1>
              <p className="text-xl text-gray-600">
                Update your story and make it even better
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <TextInput
                  label="Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your story a title"
                />

                <TextArea
                  label="Content"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={12}
                  placeholder="Write your story here..."
                />

                <ImageUpload
                  label="Images"
                  value={images}
                  onChange={setImages}
                  maxFiles={5}
                  maxSize={10}
                  helperText="Upload up to 5 images (PNG, JPG, GIF up to 10MB each)"
                />

                <TextInput
                  label="Tags"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Add tags separated by commas (e.g., Technology, Web3, AI)"
                  helperText="Add relevant tags to help readers find your story"
                />

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-white text-gray-900 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
