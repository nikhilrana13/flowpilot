"use client";

const TextRenderer = ({ text }) => (
    <div className="rounded-xl bg-[#111114] p-4">
        <p className="whitespace-pre-wrap break-words text-white">
            {text}
        </p>
    </div>
);

export default TextRenderer;