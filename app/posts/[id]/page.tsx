'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/button/Index';
import { TextArea } from '@/components/input/TextArea';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  likes: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  imageUrl?: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

export default function PostDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // TODO: Replace with actual API call
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API response
        const mockPost: Post = {
          id: params.id,
          title: 'Getting Started with Web Development',
          content: `Web development is an exciting journey that opens up a world of possibilities. In this comprehensive guide, we'll explore the fundamental concepts and tools that every aspiring web developer should know.

## The Basics

Before diving into coding, it's essential to understand the core technologies that power the web:

1. HTML (HyperText Markup Language)
2. CSS (Cascading Style Sheets)
3. JavaScript

Each of these technologies plays a crucial role in creating modern web applications.

## Getting Started

To begin your web development journey, you'll need:

- A code editor (VS Code is recommended)
- A modern web browser
- Basic understanding of computer concepts

## Next Steps

Once you've mastered the basics, you can explore:

- Frontend frameworks (React, Vue, Angular)
- Backend development
- Database management
- Deployment strategies

Remember, the key to becoming a successful web developer is consistent practice and continuous learning.`,
          excerpt: `Web development is an exciting journey that opens up a world of possibilities. In this comprehensive guide, we'll explore the fundamental concepts and tools that every aspiring web developer should know.`,
          date: '2024-03-15',
          readTime: '5 min read',
          likes: 42,
          comments: 12,
          tags: ['Web Development', 'JavaScript', 'HTML', 'CSS'],
          imageUrl: 'https://picsum.photos/800/400',
          author: {
            name: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            bio: 'Full-stack developer passionate about web technologies and open source.',
          },
        };

        const mockComments: Comment[] = [
          {
            id: '1',
            content:
              'Great article! This really helped me understand the basics.',
            author: {
              name: 'Alice Smith',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
            },
            date: '2024-03-16',
            likes: 5,
          },
          {
            id: '2',
            content: 'Would love to see more content about React!',
            author: {
              name: 'Bob Johnson',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
            },
            date: '2024-03-16',
            likes: 3,
          },
        ];

        setPost(mockPost);
        setComments(mockComments);
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to load post. Please try again.');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router]);

  const handleLike = async () => {
    try {
      // TODO: Implement like API call
      setIsLiked(!isLiked);
      if (post) {
        setPost({
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement comment API call
      const mockNewComment: Comment = {
        id: Math.random().toString(36).substring(7),
        content: newComment,
        author: {
          name: 'Current User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        },
        date: new Date().toISOString(),
        likes: 0,
      };

      setComments([mockNewComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <article className="relative py-20 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Post Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.date)} • {post.readTime}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-12">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.author.name}
                  </h3>
                  <p className="text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-12">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    isLiked ? 'text-blue-600' : 'text-gray-600'
                  } hover:text-blue-600 transition-colors`}
                >
                  <svg
                    className="w-6 h-6"
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{post.likes} likes</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{post.comments} comments</span>
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>

            {/* Comments Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Comments
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleComment} className="mb-8">
                <TextArea
                  label="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                />
                <div className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-xl border border-gray-100 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {comment.author.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(comment.date)}
                            </p>
                          </div>
                          <button className="text-gray-600 hover:text-blue-600 transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
