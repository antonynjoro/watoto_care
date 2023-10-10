import { createUploadthing } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.jsx";
import { get } from "http";

 
const f = createUploadthing();


export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession({ req, ...authOptions });
      if (!session) {
        throw new Error("Unauthorized");
      }
      return {
        userId: session.user.email,
      };


      
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
};
