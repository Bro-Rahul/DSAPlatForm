'use client';

import React from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-10">  
      <h2 className="text-red-600 text-xl font-bold">Something went wrong!</h2>
      <p className="mt-4 text-sm text-gray-700">Error: {error.message}</p>
      {error.digest && (
        <p className="text-xs text-gray-500 mt-2">
          Error Digest: {error.digest}
        </p>
      )}
      <button
        onClick={() => reset()}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
