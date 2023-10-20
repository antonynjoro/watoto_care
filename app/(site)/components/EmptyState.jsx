import Image from 'next/image'
import { type } from 'os'



function EmptyState({emptyStateText}) {
  return (
    <div className="w-full my-40  flex flex-col justify-center items-center">
                <Image
                  src="/empty.svg"
                  alt="Empty state"
                  width={300}
                  height={300}
                />
                <p>{emptyStateText}</p>
              </div>
  )
}

export default EmptyState