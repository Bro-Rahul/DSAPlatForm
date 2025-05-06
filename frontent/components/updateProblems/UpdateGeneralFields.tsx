import React from 'react'
import ProblemCard, {  ProblemStringFields } from '../utils/ProblemCard'
import useUpdateProblem from '@/store/useUpdateProblem'
import ProblemLevel from '../utils/ProblemLevel'
import MDEditor from '@uiw/react-md-editor'

const UpdateGeneralFields: React.FC<{
    slug: string,
}> = ({ slug }) => {
    const { updateProblemSingleFields, problems } = useUpdateProblem();

    return (
        <ProblemCard className='flex flex-col w-full h-full p-3 gap-5'>
            <ProblemStringFields
                label='Title'
                inputProps={{
                    value: problems[slug]?.title || '',
                    onChange: (e) => updateProblemSingleFields(slug, { title: e.target.value })
                }}
            />
            <ProblemLevel
                className='w-full'
                value={problems[slug]?.difficulty || 'Easy'}
                onValueChange={e => updateProblemSingleFields(slug, { difficulty: e })}
                editable
            />
            <div className='flex flex-col gap-3'>
                <p>Description</p>
                <MDEditor
                    value={problems[slug]?.description || ''}
                    className='w-full'
                    onChange={e => updateProblemSingleFields(slug, { description: e })}
                    height={600}
                    preview='live'
                />
            </div>
        </ProblemCard>
    )
}

export default UpdateGeneralFields