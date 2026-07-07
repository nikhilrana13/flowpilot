"use client";

const ImageRenderer = ({ src }) => {
    return (
        <img
            src={src}
            className="rounded-xl border border-[#27272A]"
        />
    );
};

export default ImageRenderer;