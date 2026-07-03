"use client"
import Link from "next/link";
import { Eye, Lock, Mail, Zap } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SetUser } from "@/redux/AuthSlice";
import { api } from "@/services/api";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const formdata = {
            workemail: data.workemail,
            password: data.password
        }
        try {
            setLoading(true)
            const response = await api.post("/api/auth/login", formdata)
            // console.log("Response", response)
            if (response) {
                toast.success(response?.message)
                const user = response?.data?.user
                const token = response?.data?.token
                localStorage.setItem("token", token)
                dispatch(SetUser(user))
                if (user?.isOnboardingCompleted) {
                    router.replace("/dashboard")
                } else {
                    router.replace("/onboarding")
                }
            }

        } catch (error) {
            console.error("Failed to login user", error)
            toast.error(error?.response?.data.message || "Internal server error")
        } finally {
            setLoading(false)
        }
    }

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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                inputMode="email"
                                {...register("workemail", {
                                    required: "Email is Required", pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                        </div>
                        {errors.workemail && (
                            <p className='text-sm text-red-500'>{errors?.workemail?.message}</p>
                        )}
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
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full bg-transparent py-3 pl-10 pr-12 text-[#E8DFEE] placeholder:text-[#3F3F46] outline-none"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters required",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute cursor-pointer right-3 text-[#71717A] transition hover:text-white"
                            >
                                <Eye className="h-5 w-5" />
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Login */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#0566D9] py-3.5 font-semibold text-white cursor-pointer transition flex items-center justify-center hover:opacity-95 active:scale-[0.98]"
                    >
                        {loading ?
                            <ThreeDots
                                visible={true}
                                height="25"
                                width="25"
                                color="#ffffff"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            : "Login"
                        }

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
