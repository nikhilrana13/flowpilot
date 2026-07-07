"use client";

import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ text }) => (
    <div className="prose prose-invert max-w-none">
        <ReactMarkdown>
            {text}
        </ReactMarkdown>
    </div>
);

export default MarkdownRenderer;