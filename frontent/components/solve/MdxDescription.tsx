"use client"
import MDEditor from "@uiw/react-md-editor"
import React from "react"

const MdxDescription: React.FC<{
  mdxString: string
}> = ({ mdxString }) => {
  return (
    <MDEditor.Markdown
      style={{
        backgroundColor : "#27272a"
      }}
      source={mdxString}
    />
  )
}

export default MdxDescription