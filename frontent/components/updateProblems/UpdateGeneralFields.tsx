import React from 'react'
import ProblemCard, {  ProblemStringFields } from '../utils/ProblemCard'
import useUpdateProblem from '@/store/useUpdateProblem'
import ProblemLevel from '../utils/ProblemLevel'
import MDEditor from '@uiw/react-md-editor'
import { Button } from '../ui/button'
import { patchProblem } from '@/http/admin/problemHttp'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Toast from '../toast'
import { icons } from '@/constants/icons'

const UpdateGeneralFields: React.FC<{
    slug: string,
}> = ({ slug }) => {
    const { updateProblemSingleFields, problems } = useUpdateProblem();
    const {data} = useSession()

    console.log(problems[slug])

    const handleSubmit = async()=>{
        try{
            await patchProblem(slug,data!.user.access,{
                description : problems[slug].description,
                title : problems[slug].title,
                difficulty : problems[slug].difficulty
            })
            toast.custom(
                <Toast
                    success
                    icon={icons.successIcon}
                    text='General Fields Updated !'
                />,{
                    position : "bottom-right",
                    duration : 3000  
                })
        }catch(err:any){
            toast.custom(
                <Toast
                    success={false}
                    icon={icons.crossIcon}
                    text='Falied to Update Problem'
                />,{
                    position : "bottom-right",
                    duration : 3000
                })
        }
    }

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
            <Button 
                className='save-btn'
                onClick={handleSubmit}
                >
                Save
            </Button>
        </ProblemCard>
    )
}

export default UpdateGeneralFields