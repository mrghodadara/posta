'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';

import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Button } from '@/components/button/Index';
import { Spinner } from '@/components/loader/Spinner';
import { Input } from '@/components/form/Input';
import { PostAPI } from '@/http/post';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface InitialValues {
  title: string;
  content: string;
  tags: string[];
}

const initialValues: InitialValues = {
  title: '',
  content: '',
  tags: [],
};

export default function EditPost() {
  const router = useRouter();
  const { id }: { id: string } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [tagInput, setTagInput] = useState('');

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .min(16, 'Title must be minimum 16 character long')
        .required('Required'),

      content: Yup.string()
        .trim()
        .min(16, 'Content must be minimum 200 character long')
        .required('Required'),
    }),
    onSubmit: ({ title, content, tags }, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      PostAPI.editPost(id, { title, content, tags })
        .then((response) => {
          if (response?.status === 200) {
            toast.success(response?.data?.data?.message);
            router.push('/profile/my-posts');
            resetForm();
          }
        })
        .catch((error) => {
          console.log('error', error);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      const newTag = tagInput.trim();

      if (newTag && !values?.tags.includes(newTag)) {
        setFieldValue('tags', [...values?.tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFieldValue(
      'tags',
      values?.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const getPost = () => {
    setIsLoading(true);

    PostAPI.getPost(id)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data?.post) {
          setValues({
            title: response?.data?.data?.post?.title || '',
            content: response?.data?.data?.post?.content || '',
            tags: response?.data?.data?.post?.tags || '',
          });
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  return (
    <div>
      <main className="flex-grow">
        <section className="relative py-8 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">
                Update Post
              </h1>
              {/* <p className="text-base text-gray-600">
                Manage your account settings and preferences
              </p> */}
            </div>

            <div className="p-6 bg-white rounded-lg border shadow-md border-gray-200">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Spinner width={32} height={32} />
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="space-y-5"
                >
                  <div>
                    <Input
                      label="Title"
                      id="title"
                      name="title"
                      placeholder="Enter Title"
                      value={values?.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched?.title && errors?.title ? errors?.title : ''
                      }
                      className="pl-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <div className="prose max-w-none">
                      <ReactQuill
                        value={values?.content}
                        onChange={(data) => setFieldValue('content', data)}
                        className="h-64 mb-12"
                        placeholder="Write your post content here..."
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>

                    {values?.tags && values?.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {values?.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <Input
                      id="tags"
                      name="tags"
                      placeholder="Type and press Enter or comma to add tags"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                      className="pl-3"
                    />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="max-w-28"
                    >
                      {isSubmitting ? <Spinner stroke="#FFFFFF" /> : 'Save'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
