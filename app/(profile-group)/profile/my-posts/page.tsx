'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button/Index';
import { PostAPI } from '@/http/post';
import { useAuth } from '@/contexts/auth.context';
import { PostType } from '@/types/post';
import { Spinner } from '@/components/loader/Spinner';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import Link from 'next/link';
import { DeletePostModal } from '@/components/modal/DeletePostModal';

export default function MyPosts() {
  const router = useRouter();

  const { user } = useAuth();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);

  const handleEdit = (postId: string) => {
    router.push(`/posts/${postId}/edit`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getUserPosts = () => {
    setIsLoading(true);

    PostAPI.getPostsByUserId(user?._id || '')
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
    if (user?._id) {
      getUserPosts();
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-700 p-5">My Posts</h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner width={32} height={32} />
        </div>
      )}

      {!isLoading && (
        <div className="">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border-t border-gray-200 p-5"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Post Image */}
                {/* {post.imageUrl && (
                <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    //   fill
                    className="object-cover"
                  />
                </div>
              )} */}

                {/* Post Content */}
                <div className="flex flex-grow flex-col gap-3">
                  <div className="flex justify-between items-center w-full gap-2">
                    <h2 className="text-2xl font-bold text-gray-900 w-full">
                      {post.title}
                    </h2>

                    <div className="flex gap-1 items-center">
                      <Link
                        onClick={() => handleEdit(post._id)}
                        className="text-gray-5 hover:bg-gray-10/50 rounded-full w-8 aspect-square flex justify-center items-center"
                        href={`/posts/${post?._id}/edit`}
                      >
                        <EditIcon />
                      </Link>

                      <button
                        onClick={() => {
                          setPostId(post?._id);
                          setIsOpenDeleteModal(true);
                        }}
                        className="text-red-600 hover:bg-red-100 rounded-full w-8 aspect-square flex justify-center items-center"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>

                  <p
                    className="line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <div className="flex flex-wrap gap-2">
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
                    <span>{formatDate(post.createdAt)}</span>
                    {/* <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.likes} likes</span>
                  <span>•</span>
                  <span>{post.comments} comments</span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!posts.length && (
            <div className="flex flex-col items-center py-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900">
                No posts yet
              </h3>
              <p className="text-gray-600">
                Start writing your first post to share your story with the world
              </p>
              <Button
                className="w-fit mt-4"
                onClick={() => router.push('/posts/new')}
              >
                Add Post
              </Button>
            </div>
          )}
        </div>
      )}

      <DeletePostModal
        id={postId}
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        getData={getUserPosts}
      />
    </div>
  );
}
