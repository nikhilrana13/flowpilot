import useDeleteNode from '@/hooks/useDeleteNode';
import { Trash2 } from 'lucide-react';
import React from 'react';

const DeleteNodeButton = () => {
    const deleteNode = useDeleteNode()
    return (
        <button
            onClick={deleteNode}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
        >
            <Trash2 size={16} />
            Delete Node
        </button>
    );
}

export default DeleteNodeButton;
