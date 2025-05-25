'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/button/Index';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  imageUrl?: string;
}

export default function MyPosts() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Getting Started with Web Development',
      excerpt:
        'Learn the fundamentals of web development and start your journey...',
      date: '2024-03-15',
      readTime: '5 min read',
      likes: 42,
      comments: 12,
      tags: ['Web Development', 'JavaScript'],
      imageUrl: 'https://picsum.photos/800/400',
    },
    {
      id: '2',
      title: 'The Future of AI in Software Development',
      excerpt:
        'Exploring how artificial intelligence is transforming the way we write code...',
      date: '2024-03-10',
      readTime: '8 min read',
      likes: 78,
      comments: 23,
      tags: ['AI', 'Technology'],
      imageUrl: 'https://picsum.photos/800/401',
    },
  ]);

  const handleEdit = (postId: string) => {
    router.push(`/posts/${postId}/edit`);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(postId);
    try {
      // TODO: Implement delete API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  My Posts
                </h1>
                <p className="text-xl text-gray-600">
                  Manage your published stories
                </p>
              </div>
              <Button onClick={() => router.push('/posts/new')}>
                Write New Post
              </Button>
            </div>

            <div className="grid gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Post Image */}
                    {post.imageUrl && (
                      <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          //   fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {post.title}
                        </h2>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEdit(post.id)}
                            className="!w-auto bg-white text-gray-900 hover:bg-gray-50"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(post.id)}
                            className="!w-auto bg-red-500 hover:bg-red-600"
                            disabled={isDeleting === post.id}
                          >
                            {isDeleting === post.id ? 'Deleting...' : 'Delete'}
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.likes} likes</span>
                        <span>•</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {posts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start writing your first post to share your story with the
                    world
                  </p>
                  <Button onClick={() => router.push('/posts/new')}>
                    Write Your First Post
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
