'use client'

import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { adminLogin } from '@/actions/auth'
import { Button } from '@/components/ui/button'

type AdminLoginValues = {
  email: string
  password: string
}

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, startTransition] = useTransition()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginValues>()

  const onSubmit = (values: AdminLoginValues) => {
    setError('')
    startTransition(async () => {
      const result = await adminLogin(values)
      if (result.success) {
        router.push('/admin/dashboard')
      } else {
        setError(result.message ?? 'Something went wrong')
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl shadow-md">
        <div className="hidden w-1/2 lg:block">
          <Image
            src="/images/admin/admin-login-illustration.png"
            alt="Admin login illustration"
            width={600}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-center bg-white px-10 py-12 lg:w-1/2">
          <div className="mb-10">
            <Image
              src="/images/admin/fitcall-logo.png"
              alt="FitCall logo"
              width={120}
              height={40}
            />
          </div>

          <h1 className="mb-8 text-2xl font-normal text-neutral-900">
            Login as an Admin
          </h1>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                disabled={isLoading}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="******"
                  disabled={isLoading}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  {...register('password', {
                    required: 'Password is required',
                    onChange: (e) =>
                      setHasPassword(e.target.value.length > 0),
                  })}
                />
                {hasPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                )}
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B2B4B] py-6 text-white hover:bg-[#1B2B4B]/90"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
