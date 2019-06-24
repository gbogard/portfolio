import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Code = ({ children, className }) => {
  const language = (className || '').split('-')[1]
  return (
    <SyntaxHighlighter style={docco} language={language}>
      {children}
    </SyntaxHighlighter> 
  )
} 