import { useCreateWorkSpaceMutation } from '@/redux/api/WorkspaceApi';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateWorkSpaceDialog = ({ onClose }) => {
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [CreateWorkSpace, { isLoading }] = useCreateWorkSpaceMutation()


    const handleCreateWorkSpace = async () => {
        const spacename = input.trim();
        if (!spacename) {
            setError("Spacename is Required")
            return;
        }
        try {
            const response = await CreateWorkSpace(spacename).unwrap()
            toast.success(response?.message)
            setError("")
            setInput("")
            onClose()
        } catch (error) {
            console.error("failed to create workspace", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <div className='fixed inset-0 z-[100000] flex items-center justify-center p-5'>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />
            {/* Dialog */}
            <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl border border-[#2A2A33] bg-[#18181B] shadow-[0_0_80px_rgba(124,58,237,.18)]">
                {/* Header */}
                <div className="border-b border-[#27272A] px-6 py-5">
                    <h2 className="text-xl font-semibold text-white">
                        Create Workspace
                    </h2>

                    <p className="mt-1 text-sm text-[#A1A1AA]">
                        Give your workspace a unique name to organize workflows.
                    </p>
                </div>

                {/* Body */}
                <div className="space-y-6 p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#E4E4E7]">
                            Workspace Name
                        </label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g. Marketing Automation"
                            className="w-full rounded-2xl border border-[#27272A] bg-[#111114] px-4 py-3 text-white placeholder:text-[#71717A] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                        />
                        {error && (
                            <p className="mt-2 text-xs text-red-500">
                                {error}
                            </p>
                        )}
                        <p className="mt-2 text-xs text-[#71717A]">
                            Workspace names must be unique.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-[#27272A] px-6 py-5">
                    <button
                        onClick={onClose}
                        className="rounded-xl border cursor-pointer border-[#27272A] px-5 py-2.5 text-[#A1A1AA] transition hover:bg-[#232329] hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        disabled={isLoading}
                        onClick={handleCreateWorkSpace}
                        className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#0566D9] px-6 py-2.5 font-medium text-white flex items-center disabled:cursor-not-allowed  cursor-pointer shadow-[0_0_30px_rgba(124,58,237,.25)] transition hover:scale-[1.02]"
                    >
                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                        {isLoading ? "Creating..." : "Create Workspace"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateWorkSpaceDialog;
