"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MDXEditor from "@uiw/react-md-editor"
import React, { useState } from 'react'
import commandsList from '@/constants/editorComponents'
import { SubmissionsHistoryType } from '@/types/submissions'
import { getSolutionStarterString } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { postSubmitSolution } from '@/http/general/solutionHttp'
import { useRouter } from 'next/navigation'
import Toast from '../toast'
import toast from 'react-hot-toast'
import { icons } from '@/constants/icons'


const SolutionComponent: React.FC<{
    submissionData: SubmissionsHistoryType
}> = ({ submissionData }) => {
    const mdxString = getSolutionStarterString(
        submissionData.submission_code,
        submissionData.submission_lang
    )

    const router = useRouter();
    const { data: session } = useSession();
    const [value, setValue] = useState<string>(mdxString)
    const [tags, setTags] = useState<string[]>([''])
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleTagChange = (index: number, newValue: string) => {
        const updatedTags = [...tags]
        updatedTags[index] = newValue
        setTags(updatedTags)
    }

    const addTag = () => {
        setTags([...tags, ''])
    }

    const removeTag = (index: number) => {
        if (tags.length === 1) return
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        const filteredTags = tags.map(t => t.trim()).filter(Boolean)

        if (!session?.user.access) {
            setError('Session is expired login to create a new Session.')
            return
        }
        if (!title.trim()) {
            setError('Title is required.')
            return
        }

        if (filteredTags.length === 0) {
            setError('At least one non-empty tag is required.')
            return
        }

        setError(null)

        try {
            await postSubmitSolution({problem:submissionData.problem,solution_tags:tags,solution_text:value,title},session.user.access);
            router.back();
        } catch (err:any) {
            toast.custom(
                <Toast 
                    success={false}
                    icon={icons.crossIcon}
                    text={err.message}
                />
            )
        }
    }

    return (
        <div className="flex flex-col w-[70%] mx-auto mt-5 bg-zinc-800/60 p-6 rounded-lg space-y-4">
            {error && (
                <p className="text-red-500 font-medium">{error}</p>
            )}

            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your title for solution"
                className="text-white placeholder:text-zinc-400"
            />

            <div className="flex flex-col gap-2">
                <label className="text-zinc-300 font-medium">Tags</label>
                {tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            placeholder={`Tag #${index + 1}`}
                            className="text-white placeholder:text-zinc-400"
                        />
                        {tags.length > 1 && (
                            <Button variant="destructive" onClick={() => removeTag(index)}>Remove</Button>
                        )}
                    </div>
                ))}
                <Button variant="outline" onClick={addTag}>+ Tag</Button>
            </div>

            <MDXEditor
                height={800}
                value={value}
                className="solution-mdx bg-zinc-900 text-white"
                commands={commandsList}
                onChange={(e) => setValue(e!)}
            />

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
                <Button variant="outline">Cancel</Button>
            </div>
        </div>
    )
}

export default SolutionComponent
