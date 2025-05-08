"use client"
import { Button } from '@/components/ui/button'
import ProblemCard, { ProblemHintsAndTags, ProblemStringFields } from '@/components/utils/ProblemCard'
import ProblemLevel from '@/components/utils/ProblemLevel'
import useSetProblem from '@/store/useSetProblem'
import MDEditor from "@uiw/react-md-editor"
import React from 'react'
import { toast } from 'react-hot-toast'
import Toast from '@/components/toast'
import { setProblemValidator } from '@/types/zod'
import { icons } from "@/constants/icons"
import { createProblemPOST } from '@/http/problemHttp'
import { useSession } from 'next-auth/react'
import AddNewField from '@/components/utils/AddNewField'
import TestCaseCard from '@/components/utils/TestCaseCard'


const SetProblemPage: React.FC = () => {
  const { data: user } = useSession();
  const { problem, updateSingleValueFields, updateMultiValueFields, resetProblem,updateParameterValue,removeParameter,addNewParameter } = useSetProblem()
  const handleClick = async () => {
    const result = setProblemValidator.safeParse(problem);
    if (result.success) {
      try {
        await createProblemPOST(problem, user!.user.id, user!.user.access);
        toast.custom(
          <Toast
            icon={icons.successIcon}
            success
            text='Problem Created successfully'
          />, {
          position: "bottom-right",
          duration: 3000
        });
        resetProblem();
      } catch (err: any) {
        toast.custom(
          <Toast
            icon={icons.errorIcon}
            text={err.message}
            success={false}
          />, {
          duration: 3000,
          position: "bottom-right"
        })
      }
    } else {
      const error = result.error.flatten().fieldErrors;
      Object.entries(error).forEach(([k,err], index) => toast.custom(
        <Toast
          icon={icons.errorIcon}
          text={err[0]}
          success={false}
        />, {
        duration: 3000,
        position: "bottom-right"
      }))
    }
  }
  const handleTagsAndHint = ()=>{

  }
  
  return (
    <div className='grid grid-cols-1 p-2 w-full'>
      <h1 className='label'>Set New Problem</h1>
      <div className='grid grid-cols-2 p-2 w-full max-lg:grid-cols-1'>
        <ProblemCard>
          <div className='flex w-full items-center gap-5'>
            <ProblemStringFields
              className='w-full'
              value={problem.title}
              onlyRead
            />
            <ProblemStringFields
              className='w-[350px]'
              value={problem.level}
              onlyRead
            />
          </div>
          <MDEditor.Markdown
            source={problem.description}
            className='w-full h-[600px] overflow-y-scroll'
          />
          <ProblemHintsAndTags
            label='Problem Tags'
            values={problem.tags}
            onlyRead
            updateFields={updateMultiValueFields}
            on='tags'
          />
          <ProblemHintsAndTags
            label='Problem Hints'
            values={problem.hints}
            onlyRead
            updateFields={updateMultiValueFields}
            on='hints'
          />
        </ProblemCard>
        <ProblemCard>
          <div className='flex w-full items-center gap-5'>
            <ProblemStringFields
              label='Title'
              className='w-full'
              inputProps={{
                value: problem.title,
                onChange: (e) => updateSingleValueFields({ title: e.target.value })
              }}
            />
            <ProblemLevel
              value={problem.level}
              onValueChange={(e) => updateSingleValueFields({ level: e })}
              editable
            />
          </div>
          <MDEditor
            value={problem.description}
            className='w-full'
            onChange={e => updateSingleValueFields({ description: e })}
            height={600}
            preview='edit'
          />
          <AddNewField 
            onAddParameter={addNewParameter}
          />
          <TestCaseCard
            onRemoveParameter={removeParameter}
            onChange={updateParameterValue}
            inputParameters={problem.inputParameters}
            testcases={problem.testcases}
          />
          <ProblemHintsAndTags
            values={problem.tags}
            label='Problem Tags'
            on='tags'
            updateFields={updateMultiValueFields}
          />
          <ProblemHintsAndTags
            values={problem.hints}
            label={'Problem Hints'}
            on='hints'
            updateFields={updateMultiValueFields}
          />
        </ProblemCard>
      </div>
      <Button
        onClick={handleClick}
        className='save-btn'>
        Set Problem
      </Button>
    </div>
  )
}

export default SetProblemPage