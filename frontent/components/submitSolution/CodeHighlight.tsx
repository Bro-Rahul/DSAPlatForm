'use client';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // dark background
import { useEffect, useRef, useState } from 'react';
import MDXEditor from "@uiw/react-md-editor"

interface CodeHighlightProps {
    language?: string;
    code: string;
}

export default function CodeHighlight({ language = 'xml', code }: CodeHighlightProps) {
    // const codeRef = useRef<HTMLElement>(null);
    const [newCode,setCode] = useState<string>(code)
    const highlightedCode = hljs.highlight(
        newCode,
        { language: 'java' }
    ).value

    /*   useEffect(() => {
        if (codeRef.current) {
          hljs.highlightElement(codeRef.current);
        }
      }, [code]); */
    return (
        <MDXEditor
            value={highlightedCode}
            onChange={e=>setCode(e!)}
        />
    )
}
