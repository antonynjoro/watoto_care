"use client"

import { signIn } from "next-auth/react";




export default function GoogleLoginButton({callbackUrl}) {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-500 hover:bg-slate-50 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
      onClick={() => signIn("google", { ...(callbackUrl ? { callbackUrl } : {}) })}
      >
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18.5219 10.0558C18.5219 9.41757 18.4646 8.80393 18.3583 8.21484H9.8819V11.6962H14.7255C14.5169 12.8212 13.8828 13.7744 12.9296 14.4126V16.6708H15.8383C17.5401 15.1039 18.5219 12.7967 18.5219 10.0558Z" fill="#4285F4"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.8819 18.851C12.3119 18.851 14.3492 18.0451 15.8383 16.6706L12.9296 14.4124C12.1237 14.9524 11.0928 15.2715 9.8819 15.2715C7.53781 15.2715 5.55372 13.6883 4.84599 11.561H1.83917V13.8929C3.32008 16.8342 6.36372 18.851 9.8819 18.851Z" fill="#34A853"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.84599 11.5609C4.66599 11.0209 4.56372 10.4441 4.56372 9.8509C4.56372 9.25772 4.66599 8.6809 4.84599 8.1409V5.80908H1.83917C1.22962 7.02408 0.881897 8.39863 0.881897 9.8509C0.881897 11.3032 1.22962 12.6777 1.83917 13.8927L4.84599 11.5609Z" fill="#FBBC05"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.8819 4.43062C11.2033 4.43062 12.3896 4.88471 13.3224 5.77653L15.9037 3.19517C14.3451 1.74289 12.3078 0.851074 9.8819 0.851074C6.36372 0.851074 3.32008 2.86789 1.83917 5.80926L4.84599 8.14107C5.55372 6.0138 7.53781 4.43062 9.8819 4.43062Z" fill="#EA4335"/>
      </svg>
      <span className="text-sm font-semibold leading-6 ">Google</span>
    </button>
  );
}
