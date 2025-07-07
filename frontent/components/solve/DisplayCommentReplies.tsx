import { getProblemCommentSubComments } from '@/http/general/commentHttp'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import CommentDisplay from './CommentDisplay'

const DisplayCommentReplies:React.FC<{
  commentId: number,
}> = ({commentId}) => {
  const {slug} = useParams<{slug:string}>()
  const {data:session} = useSession();
  const {data,error,isLoading,mutate} = useSWR(`/${commentId}/subcomment`,()=>getProblemCommentSubComments(slug,commentId,session?.user.access))
  let content;
  if(data && !error){
    content = data.map(comment=><CommentDisplay key={comment.id} comment={comment} mutate={mutate} />)
  }else if(!data && error) {
    content = <p>{error}</p>
  }else{
    content = <p>Loading SubComments </p>
  }
  return (
    <>{content}</>
  )
}

export default DisplayCommentReplies