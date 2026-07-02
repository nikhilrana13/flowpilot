import Link from "next/link";
import { Eye, Lock, Mail,Zap } from "lucide-react";


const Login = () => {
    return (
        <main className="z-10 w-full py-8 px-6 max-w-110">
            {/* Brand */}
            <div className="mb-8 flex flex-col items-center">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7C3AED]">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-[#7C3AED]">
                        FlowPilot
                    </span>
                </div>
                <p className="mt-1 text-sm text-[#8E8E98]">
                    Accelerate your workflow development
                </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-[#27272A] bg-[#18181B]/80 p-8 backdrop-blur-xl">
                <form className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <label className="ml-1 block text-sm font-medium text-[#8E8E98]">
                            Email
                        </label>

                        <div className="relative flex items-center rounded-lg border border-[#27272A] bg-[#0F0F13] transition-all focus-within:border-[#7C3AED]">
                            <Mail className="absolute left-3 h-5 w-5 text-[#71717A]" />

                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full bg-transparent py-3 pl-10 pr-4 text-[#E8DFEE] placeholder:text-[#3F3F46] outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-sm font-medium text-[#8E8E98]">
                                Password
                            </label>

                            <Link
                                href="#"
                                className="text-sm font-medium text-[#7C3AED] transition hover:text-[#9D74F8]"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="relative flex items-center rounded-lg border border-[#27272A] bg-[#0F0F13] transition-all focus-within:border-[#7C3AED]">
                            <Lock className="absolute left-3 h-5 w-5 text-[#71717A]" />

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent py-3 pl-10 pr-12 text-[#E8DFEE] placeholder:text-[#3F3F46] outline-none"
                            />

                            <button
                                type="button"
                                className="absolute right-3 text-[#71717A] transition hover:text-white"
                            >
                                <Eye className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Login */}
                    <button
                        type="button"
                        className="w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#0566D9] py-3.5 font-semibold text-white transition hover:opacity-95 active:scale-[0.98]"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center py-2">
                        <div className="flex-1 border-t border-[#27272A]" />

                        <span className="mx-4 text-xs uppercase tracking-[0.3em] text-[#52525B]">
                            or
                        </span>

                        <div className="flex-1 border-t border-[#27272A]" />
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-[#8E8E98]">
                        Don't have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="font-semibold text-[#7C3AED] hover:underline"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </main>

    );
}

export default Login;
