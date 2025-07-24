'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'
import { getProblemAvaliableSolutions } from '@/http/general/solutionHttp'
import { AvailableSolutionType } from '@/types/solutions'
import MDXEditor from "@uiw/react-md-editor"


type Tag = {
    tag: string
    count: number
}

type SolutionsPageProps = {
    slug: string
    tags: Tag[]
}

const FilterSolutions: React.FC<SolutionsPageProps> = ({ slug, tags }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [solutions, setSolutions] = useState<AvailableSolutionType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedSolution, setSelectedSolution] = useState<AvailableSolutionType | null>(null)

    const dialogRef = useRef<HTMLDialogElement>(null)

    const selectedTags = useMemo(() => {
        return searchParams.getAll('tags')
    }, [searchParams])

    const fetchSolutions = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getProblemAvaliableSolutions(slug, selectedTags)
            setSolutions(data)
        } catch (err) {
            console.error(err)
            setError('Failed to fetch solutions.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSolutions()
    }, [slug, selectedTags.join('&')])

    const toggleTag = (tag: string) => {
        const current = new Set(selectedTags)

        if (current.has(tag)) {
            current.delete(tag)
        } else {
            current.add(tag)
        }

        const params = new URLSearchParams()
        Array.from(current).forEach((t) => params.append('tags', t))

        const query = params.toString()
        router.push(`${window.location.pathname}?${query}`)
    }

    const openDialog = (solution: AvailableSolutionType) => {
        setSelectedSolution(solution)
        dialogRef.current?.showModal()
    }

    const closeDialog = () => {
        dialogRef.current?.close()
        setSelectedSolution(null)
    }

    return (
        <div className="w-full h-full overflow-y-scroll custume-scrollbar p-6 text-zinc-800 dark:text-zinc-100">
            {/* Tags Filter */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Available Tags</h2>
                <div className="flex flex-wrap gap-3">
                    {tags.map(({ tag, count }) => {
                        const isSelected = selectedTags.includes(tag)

                        return (
                            <Badge
                                key={tag}
                                variant={isSelected ? 'default' : 'outline'}
                                className="transition cursor-pointer"
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                                <span className="ml-1 text-muted-foreground">({count})</span>
                            </Badge>
                        )
                    })}
                </div>
            </div>

            {/* Solutions */}
            <div className="mt-6">
                {loading && <p>Loading solutions...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && solutions.length === 0 && (
                    <p>No solutions found for selected tags.</p>
                )}

                {!loading && !error && solutions.length > 0 && (
                    <SolutionList solutions={solutions} onSelect={openDialog} />
                )}
            </div>

            {/* Solution Dialog */}
            <dialog
                ref={dialogRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    p-0 rounded-xl w-full max-w-2xl h-[80vh]
    bg-zinc-900 text-zinc-100 shadow-xl border border-zinc-700
    backdrop:bg-black/80 overflow-hidden"
            >
                {selectedSolution && (
                    <div className="flex flex-col h-full">

                        {/* Sticky Header: Title + Close */}
                        <div className="p-4 border-b border-zinc-700 bg-zinc-900 sticky top-0 z-20 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{selectedSolution.title}</h2>
                            <button
                                onClick={closeDialog}
                                className="text-zinc-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Sticky Tags */}
                        <div className="p-4 border-b border-zinc-700 bg-zinc-900 sticky top-[56px] z-10 flex flex-wrap gap-2">
                            {selectedSolution.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-100"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            <MDXEditor.Markdown source={selectedSolution.solution_text} />
                        </div>
                    </div>
                )}
            </dialog>


        </div>
    )
}

export default FilterSolutions

// 🧩 Sub-component
const SolutionList: React.FC<{
    solutions: AvailableSolutionType[]
    onSelect: (s: AvailableSolutionType) => void
}> = ({ solutions, onSelect }) => {
    return (
        <div className="grid gap-6 cursor-pointer">
            {solutions.map((solution, index) => (
                <div
                    key={`${solution.id}-${index}`}
                    className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 shadow-sm bg-zinc-100 dark:bg-zinc-900 hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-600"
                    onClick={() => onSelect(solution)}
                >
                    <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {solution.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-full text-zinc-800 dark:text-zinc-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
