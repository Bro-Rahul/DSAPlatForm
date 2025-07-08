import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { postProblemComment } from '@/http/general/commentHttp';
import { useSession } from 'next-auth/react';
import { KeyedMutator, mutate } from 'swr';
import { ProblemCommentResponseType } from '@/types/response';
import toast from 'react-hot-toast';
import Toast from '../toast';
import { icons } from '@/constants/icons';

const commentSchema = z.object({
    comment: z.string({ required_error: "Comment can't be an empty " }).min(3, 'Comment is too small (3)')
});

type CommentValidatorType = z.infer<typeof commentSchema>

const ProblemCommentForm: React.FC<{
    problemId: number
    mutate: KeyedMutator<ProblemCommentResponseType[]>
}> = ({ problemId, mutate }) => {
    const { data: session } = useSession();

    const { handleSubmit, control, formState: { isValid },reset } = useForm<CommentValidatorType>({
        defaultValues: {
            comment: '',
        },
        resolver: zodResolver(commentSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        if (isValid && session?.user.access) {
            try{
                await postProblemComment({ comment: data.comment, problem: problemId }, session.user.access);
                mutate();
                reset()
            }catch(err:any){
                toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text={err.message}

                />, {
                position: 'bottom-right',
                duration: 3000
            })
            }
        } else {
            reset()
            toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text={'Login first to post Comment on problem'}

                />, {
                position: 'bottom-right',
                duration: 3000
            })
        }
    });
    return (
        <form onSubmit={onSubmit} className="mb-6">
            <Controller
                name='comment'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) =>
                    <>
                        <textarea
                            value={value}
                            onChange={onChange}
                            placeholder="Write your comment..."
                            className="w-full border border-gray-500 bg-zinc-700 text-white rounded-md p-3 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                            rows={4}
                        />
                        {error && <p className=''>{error.message}</p>}
                    </>
                }
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Post Comment
            </button>
        </form>
    )
}

export default ProblemCommentForm
