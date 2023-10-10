"use client";
 
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
 
import { UploadDropzone, UploadButton } from "@uploadthing/react";
import { toast } from "react-hot-toast";
 
export function ImageUploadZone({setImageUrls}) {
  return (
    <main className="flex flex-col items-stretch justify-between ">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          toast.success("Upload Completed");

          // Extract the URLs from the response.
          const uploadedImageUrls = res.map(fileDetail => fileDetail.url);

          console.log ("uploadedImageUrls: ", uploadedImageUrls); 
          // Pass the URLs to the parent component.
          setImageUrls(prevState => [...prevState, ...uploadedImageUrls]);
        }}
        onUploadError={(error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
          console.log(error);
        }}
        className= "ut-label:text-gray-900 ut-label:hover:text-orange-700 ut-button:bg-gray-900 ut-button:hover:bg-gray-700 cursor-pointer"
      />
    </main>
  );
}

export function ImageUploadButton() {
  return (
    <main className="flex  flex-col items-stretch justify-between">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}