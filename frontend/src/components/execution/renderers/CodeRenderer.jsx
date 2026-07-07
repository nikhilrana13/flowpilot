"use client";

import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism } from "react-syntax-highlighter";

const CodeRenderer = ({
    code,
    language = "javascript",
}) => (
    <SyntaxHighlighter
        language={language}
        style={atomDark}
    >
        {code}
    </SyntaxHighlighter>
);

export default CodeRenderer;