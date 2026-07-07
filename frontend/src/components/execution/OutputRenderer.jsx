"use client";

import React from "react";
import JsonRenderer from "./renderers/JsonRenderer";
import TableRenderer from "./renderers/TableRenderer";
import TextRenderer from "./renderers/TextRenderer";
import ImageRenderer from "./renderers/ImageRenderer";
import MarkdownRenderer from "./renderers/MarkdownRenderer";
import CodeRenderer from "./renderers/CodeRenderer";

const imageRegex = /\.(png|jpg|jpeg|gif|svg|webp)$/i;

const OutputRenderer = ({ data }) => {
    if (!data) return null;

    let value = data;

    if (typeof value === "string") {
        try {
            value = JSON.parse(value);
        } catch {}
    }

    // Array
    if (Array.isArray(value)) {
        return <TableRenderer data={value} />;
    }

    // Object
    if (
        typeof value === "object" &&
        value !== null
    ) {
        return <JsonRenderer data={value} />;
    }

    // Image
    if (
        typeof value === "string" &&
        imageRegex.test(value)
    ) {
        return <ImageRenderer src={value} />;
    }

    // HTML
    if (
        typeof value === "string" &&
        value.includes("<html")
    ) {
        return (
            <CodeRenderer
                language="html"
                code={value}
            />
        );
    }

    // Markdown
    if (
        typeof value === "string" &&
        (value.includes("# ") ||
            value.includes("```") ||
            value.includes("- "))
    ) {
        return <MarkdownRenderer text={value} />;
    }

    return <TextRenderer text={String(value)} />;
};

export default OutputRenderer;