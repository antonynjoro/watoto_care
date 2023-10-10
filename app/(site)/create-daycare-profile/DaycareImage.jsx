import Image from "next/image";


export default function DaycareImage({ imageUrl, imageAlt, deleteImage }) {
  return (
    <div className="relative">
      
        <Image
          src={imageUrl}
          alt={imageAlt}
          objectFit="cover"
          className="rounded-md"
          height={200}
          width={200}
        />
      {/* remove image from list */}
      <button 
      className="flex flex-row justify-center items-center rounded-md bg-red-900/30 absolute top-1 right-1 hover:bg-red-600"
      onClick={()=>deleteImage(imageUrl)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
