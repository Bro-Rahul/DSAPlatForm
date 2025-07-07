'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { getProblemComments } from '@/http/general/commentHttp';
import { useSession } from 'next-auth/react';
import ProblemCommentForm from './ProblemCommentForm';
import CommentDisplay from './CommentDisplay';


const ProblemComments: React.FC<{
  problemId: number,
}> = ({ problemId }) => {
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    '/comments',
    () => getProblemComments(slug, session?.user.access),
    {
      onSuccess: (data) => {
        return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }

    }
  );


  return (
    <div className="w-full mx-auto mt-8 px-4 text-white">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {/* Comment Creation Box */}
      <ProblemCommentForm
        problemId={problemId}
        mutate={mutate}
      />

      {/* Loading/Error State */}
      {isLoading && <p>Loading comments...</p>}
      {error && <p className="text-red-400">Failed to load comments.</p>}

      {/* Comments List */}
      {data?.length ? (

        <ul className="space-y-6">
          {data.map((comment) => (
            <CommentDisplay comment={comment} mutate={mutate} key={comment.id} />
          ))}
        </ul>

      ) : (
        !isLoading && <p className="text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

export default ProblemComments;
