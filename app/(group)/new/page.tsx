'use client';

import { useState } from 'react';
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

export default function CreatePost() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<ImageFile[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create FormData for multipart/form-data
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('content', formData.content);
            submitData.append('tags', formData.tags);
            images.forEach((image) => {
                submitData.append('images', image.file);
            });

            // TODO: Implement post creation logic with FormData
            console.log('Creating post with images:', submitData);
            router.push('/posts');
        } catch (error) {
            console.error('Error creating post:', error);
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
                                Create Your Story
                            </h1>
                            <p className="text-xl text-gray-600">
                                Share your thoughts and experiences with the world
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
                                        {isSubmitting ? 'Publishing...' : 'Publish Story'}
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