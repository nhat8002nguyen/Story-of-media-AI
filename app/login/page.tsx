'use client'

import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import { Button } from '../ui/button';

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  const handleAction = (formData: FormData) => {
    localStorage.setItem("email", formData.get("email") as string)
    dispatch(formData)
  }

  return (
    <main className="App h-screen py-40 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center px-8">
      <div className='flex flex-col items-left w-160'>
        <div>
          <h1 className='text-big-title font-nunito'>
            Welcome to <span className='text-primary-color-r'>Story of Media</span> AI
          </h1>
          <div>
            <p>Login to start tell a story about your media.</p>
          </div>
        </div>
        <form className='flex flex-col gap-4' action={handleAction}>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <LoginButton />
            <div className='pt-4'>
              <p className='text-sm'>Don't have an account? <Link className='text-primary-color-r' href={"/register"}>Register</Link>
              </p>
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live='polite'
              aria-atomic='true'
            >
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}


function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}