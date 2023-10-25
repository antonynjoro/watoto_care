"use client"


import Image from 'next/image'
import { type } from 'os'
import { useRouter } from 'next/navigation'




function EmptyState({emptyStateText}) {
  const router = useRouter()
  return (
    <div className="w-full my-40  flex flex-col justify-center items-center">
                <Image
                  src="/empty.svg"
                  alt="Empty state"
                  width={300}
                  height={300}
                />
                <p>{emptyStateText}</p>
                <button
                  onClick={() => router.back()}
                  className=" 
                  mt-5
                  flex
                  justify-center
                  border
                  border-gray-500 
                  rounded-md 
                  bg-white 
                  hover:bg-timberwolf-100 
                  text-gray-900 
                  py-2 
                  px-8
                "
                >
                  Go back
                </button>
              </div>
  )
}

export default EmptyState