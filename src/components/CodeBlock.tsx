import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { srcery as editorTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ts from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript';

SyntaxHighlighter.registerLanguage('typescript', ts);

export const CodeBlock = ({ ...props }) => {
  return (
    <SyntaxHighlighter language="typescript" style={editorTheme} wrapLines={true} className="not-prose" PreTag="div">
      {props.children}
    </SyntaxHighlighter>
  );
};
