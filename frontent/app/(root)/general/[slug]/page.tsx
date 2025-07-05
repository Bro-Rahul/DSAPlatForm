
import { redirect } from 'next/navigation'
import React from 'react'

const page:React.FC<{
  params : Promise<{slug:string}>
}> = async ({params}) => {
  const {slug} = await params
  redirect(`/general/${slug}/description`)
}

export default page