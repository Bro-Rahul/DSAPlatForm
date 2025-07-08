import { ProblemCommentResponseType } from '@/types/response'
import React from 'react'
import Image from 'next/image'
import { icons } from '@/constants/icons'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Toast from '../toast'
import { postProblemCommentDisLike, postProblemCommentLike } from '@/http/general/commentHttp'
import { KeyedMutator, mutate } from 'swr'

const LikeDislikeBtn: React.FC<{
    comment: ProblemCommentResponseType,
    mutate: KeyedMutator<ProblemCommentResponseType[]>
}> = ({ comment, mutate }) => {
    const { data: session } = useSession();
    const handleLikeClick = async () => {
        if (!session?.user) {
            toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text='Login first for voting'
                />,
                {
                    position: 'bottom-right',
                    duration: 3000
                }
            )
            return;
        }
        try {
            await postProblemCommentLike(comment.id, session.user.access);
            await mutate();
        } catch (err: any) {
            toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text={err.message}
                />,
                {
                    position: 'bottom-right',
                    duration: 3000
                }
            )
        }
    }

    const handleDisLikeClick = async () => {
        if (!session?.user) {
            toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text='Login first for voting'
                />,
                {
                    position: 'bottom-right',
                    duration: 3000
                }
            )
            return;
        }
        try {
            await postProblemCommentDisLike(comment.id, session.user.access);
            await mutate();
        } catch (err: any) {
            toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text={err.message}
                />,
                {
                    position: 'bottom-right',
                    duration: 3000
                }
            )
        }
    }

    return (
        <div className="flex items-center space-x-4 text-sm">
            {/* Like Button */}
            <button
                className={`flex items-center space-x-1 transition ${comment.user_vote === 'Liked'
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-blue-300'
                    }`}
                onClick={handleLikeClick}
            >
                <Image
                    src={
                        comment.user_vote === 'Liked'
                            ? icons.likeFillIcon
                            : icons.likeIcon
                    }
                    width={18}
                    height={18}
                    priority
                    alt="like icon"
                />
                <span>{comment.likes}</span>
            </button>

            {/* Dislike Button */}
            <button
                className={`flex items-center space-x-1 transition ${comment.user_vote === 'DisLiked'
                    ? 'text-red-400'
                    : 'text-gray-400 hover:text-red-300'
                    }`}
                onClick={handleDisLikeClick}
            >
                <Image
                    src={
                        comment.user_vote === 'DisLiked'
                            ? icons.dislikeFillIcon
                            : icons.dislikeIcon
                    }
                    width={18}
                    height={18}
                    priority
                    alt="dislike icon"
                />
                <span>{comment.dislikes}</span>
            </button>
        </div>

    )
}

export default LikeDislikeBtn