import FilterSolutions from '@/components/solve/FilterSolution'
import { Badge } from '@/components/ui/badge'
import { getProblemSolutionAvailableTags } from '@/http/general/solutionHttp'
import React from 'react'

const SolutionsPage: React.FC<{
  params: Promise<{ slug: string }>
}> = async ({ params }) => {
  const { slug } = await params
  const { tags } = await getProblemSolutionAvailableTags(slug)

  return <FilterSolutions slug={slug} tags={tags} />

}

export default SolutionsPage
