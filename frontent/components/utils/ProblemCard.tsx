import React from 'react'
import { Input } from '../ui/input'
import { icons } from '@/constants/icons'
import Image from 'next/image'
import { Operations } from '@/store/useSetProblem'
import ProblemHint from './ProblemHint'
import ProblemTags from './ProblemTags'

const ProblemCard: React.FC<{
  children: React.ReactNode,
  className? : string
}> = ({ children,className }) => {
  return (
    <div className={className?className:'flex flex-col w-full items-center h-full p-2 gap-5'}>
      {children}
    </div>
  )
}

export default ProblemCard

export const ProblemStringFields: React.FC<{
  inputProps?: React.ComponentProps<'input'>,
  label?: string,
  className?: string,
  onlyRead?: boolean,
  value?: string
}> = ({ inputProps, label, className, onlyRead, value }) => {
  return (
    <p className={`inline-flex flex-col ${className}`}>
      {label && <span>{label}</span>}
      {!onlyRead ? <Input {...inputProps} /> : <span>{value}</span>}
    </p>
  )
}

export const ProblemHintsAndTags: React.FC<{
  label: string,
  className?: string,
  values: string[],
  onlyRead?: boolean,
  on: "hints" | "tags",
  updateFields: (operation: Operations, on: "hints" | "tags", index?: number, value?: string) => void
}> = ({ label, values, onlyRead, className, updateFields, on }) => {
  let content;
  if (on === "hints") {
    content = <ProblemHint values={values} updateFields={updateFields} onlyRead={onlyRead} />
  } else {
    content = <ProblemTags values={values} updateFields={updateFields} onlyRead={onlyRead} />
  }
  return (
    <div className={`${className ? className : 'flex flex-col w-full gap-5'}`}>
      <p className="flex justify-between items-center text-center w-full bg-zinc-800 p-2 rounded-full text-xl font-bold px-4">
        <span className="w-full text-center">{label}</span>
        {!onlyRead &&
          <Image
            src={icons.addIcon}
            width={30}
            height={30}
            alt="Add Hint"
            className="cursor-pointer"
            onClick={e => updateFields("ADD", on)}
          />}
      </p>
      {content}
    </div>
  )
}

export const UpdateMultiValueFields: React.FC<{
  label: string,
  className?: string,
  values: string[],
  onlyRead?: boolean,
  on: "hints" | "tags",
  updateFields: (operation: Operations, on: "hints" | "tags", index?: number, value?: string) => void
}> = ({ label, values, onlyRead, className, updateFields, on }) => {
  let content;
  if (on === "hints") {
    content = <ProblemHint values={values} updateFields={updateFields} onlyRead={onlyRead} />
  } else {
    content = <ProblemTags values={values} updateFields={updateFields} onlyRead={onlyRead} />
  }
  return (
    <div className={`${className ? className : 'flex flex-col w-full gap-5'}`}>
      <p className="flex justify-between items-center text-center w-full bg-zinc-800 p-2 rounded-full text-xl font-bold px-4">
        <span className="w-full text-center">{label}</span>
        {!onlyRead &&
          <Image
            src={icons.addIcon}
            width={30}
            height={30}
            alt="Add Hint"
            className="cursor-pointer"
            onClick={e => updateFields("ADD", on)}
          />}
      </p>
      {content}
    </div>
  )
}