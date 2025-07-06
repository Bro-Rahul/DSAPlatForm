'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { getProblemComments } from '@/http/general/problemHttp';
import { useSession } from 'next-auth/react';

const ProblemComments = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState('');
  const { data, error, isLoading } = useSWR(
    '/comments',
    () => getProblemComments(slug, session?.user.access)
  );

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    console.log('Submit Comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="w-full mx-auto mt-8 px-4 text-white">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {/* Comment Creation Box */}
      <form onSubmit={handleCreateComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border border-gray-500 bg-zinc-700 text-white rounded-md p-3 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </form>

      {/* Loading/Error State */}
      {isLoading && <p>Loading comments...</p>}
      {error && <p className="text-red-400">Failed to load comments.</p>}

      {/* Comments List */}
      {data?.length ? (
        <ul className="space-y-4">
          {data.map((comment) => (
            <li key={comment.id} className="border border-zinc-500 rounded-lg p-4 bg-zinc-600 shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-300">User #{comment.user}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-100">{comment.comment}</p>
              <div className="mt-2 flex space-x-4 text-sm text-gray-300">
                <span>👍 {comment.likes}</span>
                <span>👎 {comment.dislikes}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p className="text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

export default ProblemComments;
