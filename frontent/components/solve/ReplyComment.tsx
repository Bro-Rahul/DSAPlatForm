import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from "zod"
import Toast from '../toast'
import { postProblemCommentReply } from '@/http/general/commentHttp'
import { KeyedMutator } from 'swr'
import { ProblemCommentResponseType } from '@/types/response'
import { icons } from '@/constants/icons'

const ReplyCommentSchema = z.object({
    comment: z.string({ required_error: "Comment should not be empty" }).min(3, "Comment is to short!")
})

type ReplyCommentType = z.infer<typeof ReplyCommentSchema>

const ReplyComment: React.FC<{
    commentId: number,
    mutate: KeyedMutator<ProblemCommentResponseType[]>

}> = ({ commentId, mutate }) => {
    const { data: session } = useSession();
    const { control, handleSubmit,reset } = useForm<ReplyCommentType>({
        defaultValues: {
            comment: ''
        },
        resolver: zodResolver(ReplyCommentSchema),
    })
    const onSubmit = handleSubmit(async (data) => {
        if (!session?.user.access) {
            toast.custom(
                <Toast
                    icon={icons.crossIcon}
                    success={false}
                    text='Login first for comment!'
                />)
        }
        console.log(data)
        try {
            await postProblemCommentReply(commentId,data.comment,session!.user.access);
            mutate();
            reset();
        } catch (err: any) {
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
    })

    return (
        <form
            onSubmit={onSubmit}
            className="mt-4"
        >
            <Controller
                control={control}
                name='comment'
                render={({ field: { onChange, value, }, fieldState: { error } }) =>
                    <>
                        <textarea
                            value={value}
                            onChange={onChange}
                            name="reply"
                            placeholder="Write your reply..."
                            className="w-full border border-zinc-600 bg-zinc-700 text-white rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            rows={3}
                        />
                        {error && <p>{error.message}</p>}
                    </>
                }
            />
            <button
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded transition"
            >
                Post Reply
            </button>
        </form>
    )
}

export default ReplyComment