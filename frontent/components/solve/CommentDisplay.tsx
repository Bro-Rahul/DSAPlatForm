import { deleteProblemComment } from '@/http/general/commentHttp'
import { ProblemCommentResponseType } from '@/types/response'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { KeyedMutator } from 'swr'
import ReplyComment from './ReplyComment'
import DisplayCommentReplies from './DisplayCommentReplies'

const CommentDisplay: React.FC<{
    comment: ProblemCommentResponseType
    mutate: KeyedMutator<ProblemCommentResponseType[]>
}> = ({ comment, mutate }) => {
    const { data: session } = useSession();
    const [replyBoxId, setReplyBoxId] = useState<number | null>(null);
    const [showReply,setShowReply] = useState<number|null>(null);

    const handleDelete = async (commentId: number) => {
        await deleteProblemComment(commentId, session!.user.access);
        mutate();
    };
    return (
        <li
            key={comment.id}
            className="border border-zinc-700 rounded-lg p-5 bg-zinc-800 shadow-md"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    {comment.avatar ? (
                        <img
                            src={comment.avatar}
                            alt={`${comment.username}'s avatar`}
                            className="w-9 h-9 rounded-full object-cover border border-zinc-600"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-zinc-600 flex items-center justify-center text-sm text-white border border-zinc-500">
                            {comment.username ? comment.username.charAt(0).toUpperCase() : '?'}
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-200">
                        {comment.username || `User #${comment.user}`}
                    </span>
                </div>
                <span className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleString()}
                </span>
            </div>

            <p className="text-gray-100 mb-3 leading-relaxed">{comment.comment}</p>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>👍 {comment.likes}</span>
                <span>👎 {comment.dislikes}</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-6 text-sm">
                <button
                    onClick={() =>
                        setReplyBoxId(replyBoxId === comment.id ? null : comment.id)
                    }
                    className="text-blue-400 hover:text-blue-300 transition"
                >
                    Reply
                </button>

                <button
                    onClick={() =>setShowReply(comment.id)}
                    className="text-green-400 hover:text-green-300 transition"
                >
                    See Replies
                </button>

                {session?.user.id === comment.user && (
                    <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-400 hover:text-red-300 transition"
                    >
                        Delete
                    </button>
                )}
            </div>
            {replyBoxId === comment.id && <ReplyComment commentId={comment.id} mutate={mutate} />}
            {showReply && <DisplayCommentReplies commentId={showReply}/>}
        </li>
    )
}

export default CommentDisplay