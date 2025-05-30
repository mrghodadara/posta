'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PostAPI } from '@/http/post';
import { PostType } from '@/types/post';
import { UserIcon } from '@/components/icons/UserIcon';
import { formatDate } from '@/utils/formatDate';

// Mock data for posts
const posts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt:
      'Learn how to build modern web applications with Next.js, React, and TypeScript.',
    author: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    date: '2024-03-15',
    readTime: '5 min read',
    likes: 42,
    comments: 12,
    tags: ['Web3', 'AI', 'Development'],
  },
  {
    id: 2,
    title: 'The Future of Web Development',
    excerpt:
      'Exploring the latest trends and technologies shaping the future of web development.',
    author: {
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    date: '2024-03-14',
    readTime: '8 min read',
    likes: 28,
    comments: 8,
    tags: ['Future', 'Technology', 'Innovation'],
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt:
      'Best practices and patterns for building scalable and maintainable applications.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    date: '2024-03-13',
    readTime: '6 min read',
    likes: 35,
    comments: 15,
    tags: ['Architecture', 'Best Practices', 'Scalability'],
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt:
      'Best practices and patterns for building scalable and maintainable applications.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    date: '2024-03-13',
    readTime: '6 min read',
    likes: 35,
    comments: 15,
    tags: ['Architecture', 'Best Practices', 'Scalability'],
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt:
      'Best practices and patterns for building scalable and maintainable applications.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    date: '2024-03-13',
    readTime: '6 min read',
    likes: 35,
    comments: 15,
    tags: ['Architecture', 'Best Practices', 'Scalability'],
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt:
      'Best practices and patterns for building scalable and maintainable applications.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    date: '2024-03-13',
    readTime: '6 min read',
    likes: 35,
    comments: 15,
    tags: ['Architecture', 'Best Practices', 'Scalability'],
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt:
      'Best practices and patterns for building scalable and maintainable applications.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    date: '2024-03-13',
    readTime: '6 min read',
    likes: 35,
    comments: 15,
    tags: ['Architecture', 'Best Practices', 'Scalability'],
  },
];

// Available tags for filtering
const availableTags = [
  'Web3',
  'AI',
  'Development',
  'Future',
  'Technology',
  'Innovation',
  'Architecture',
  'Best Practices',
  'Scalability',
];

export default function PostsList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getUserPosts = () => {
    setIsLoading(true);

    PostAPI.getPosts()
      .then((response) => {
        if (response?.status === 200) {
          setPosts(response?.data?.data?.posts);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Explore Stories
              </h1>
              <p className="text-xl text-gray-600">
                Discover amazing stories from our community
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search stories..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="w-full md:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as 'latest' | 'popular')
                    }
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
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
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
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
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mt-4 flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid/List */}
            <div
              className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="relative group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-blue-100 transition-colors"
                >
                  {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition duration-300"></div> */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {/* <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      /> */}

                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                        {post?.user?.firstName?.[0]?.toUpperCase() || (
                          <UserIcon />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.user?.firstName} {post.user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {post.tags && post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
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
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </button>
                      </div>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
