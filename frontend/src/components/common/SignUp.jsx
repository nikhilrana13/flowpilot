"use client"
import { api } from "@/services/api";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    const formdata = {
      fullname: data.fullname,
      workemail: data.workemail,
      password: data.password
    }
    try {
      setLoading(true)
      const response = await api.post("/api/auth/signup", formdata)
      // console.log("Response", response)
      if (response) {
        toast.success(response?.message)
        router.replace("/auth/login")
      }
    } catch (error) {
      console.error("Failed to sign up user", error)
      toast.error(error?.response?.data.message || "Internal server error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="relative flex md:w-1/2 lg:w-2/5 items-center justify-center px-8 py-12 ">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 opacity-20 md:hidden"
        style={{
          backgroundImage: "radial-gradient(#27272A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7C3AED]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#7C3AED]">
              FlowPilot
            </span>
          </div>
          <h2 className="text-4xl font-bold text-[#E8DFEE]">
            Get started today
          </h2>
          <p className="mt-3 text-[#CCC3D8]">
            Create your developer workspace.
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className='flex flex-col gap-1'>
            <label className="mb-2 block text-sm font-medium text-[#958DA1]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-[#4A4455] bg-[#18181B] px-4 py-3 text-[#E8DFEE] placeholder:text-[#6B7280] outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              {...register("fullname", { required: "Fullname is Required", maxLength: { value: 20, message: "Max 20 characters allowed" } })}
            />
            {errors.fullname && (
              <p className='text-sm text-red-500'>{errors?.fullname?.message}</p>
            )}
          </div>
          {/* Email */}

          <div className='flex flex-col gap-1'>
            <label className="mb-2 block text-sm font-medium text-[#958DA1]">
              Work Email
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-xl border border-[#4A4455] bg-[#18181B] px-4 py-3 text-[#E8DFEE] placeholder:text-[#6B7280] outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              {...register("workemail", {
                required: "Email is Required", pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.workemail && (
              <p className='text-sm text-red-500'>{errors?.workemail?.message}</p>
            )}
          </div>
          {/* Password */}
          <div className='flex flex-col gap-1'>
            <label className="mb-2 block text-sm font-medium text-[#958DA1]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#4A4455] bg-[#18181B] px-4 py-3 pr-12 text-[#E8DFEE] placeholder:text-[#6B7280] outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
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
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-[#958DA1] transition hover:text-white"
              >
                👁
              </button>
            </div>
            {errors.password && (
              <p className='text-sm text-red-500'>{errors?.password?.message}</p>
            )}
          </div>
          {/* Create Account */}
          <button
            type="submit"
            className="w-full rounded-xl cursor-pointer bg-gradient-to-r from-[#7C3AED] to-[#0566D9] py-4 font-semibold text-white shadow-lg flex justify-center items-center transition hover:scale-[1.01] active:scale-95"
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
              : "Create Account"
            }

          </button>
        </form>
        <p className="mt-8 text-center text-[#CCC3D8]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
