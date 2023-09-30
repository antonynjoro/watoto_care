import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
// import AWS from "aws-sdk";

export async function POST(request) {
  try {
    const body = await request.json();

    let {
      name,
      email,
      image,
      username,
      phone,
      imageAlt,
      bio,
      highlights,
      city,
      state,
    } = body;

    if (
      !name ||
      !email ||
      !image ||
      !username ||
      !phone ||
      !imageAlt ||
      !bio ||
      !highlights ||
      !city ||
      !state
    ) {
      return new NextResponse(`Missing fields ${JSON.stringify(body)}`, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if the user does not exist, throw an error
    if (!user) {
      throw new Error("User does not exist");
    }

    // // if the image is a uploaded image and not a url, upload the image to s3
    // if (image.startsWith("blob")) {
    //     const s3 = new AWS.S3({
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //         region: 'YOUR_AWS_REGION',  // for example, 'us-west-1'
    //     });

    //     // Getting the image data
    //     const base64Data = new Buffer.from(
    //     image.replace(/^data:image\/\w+;base64,/, ""),
    //     "base64"
    //     );

    //     // Getting the file type, ie: jpeg, png or gif
    //     const type = image.split(";")[0].split("/")[1];

    //     // Defining params for AWS S3 upload
    //     const params = {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: `${username}.${type}`, // type is not required
    //     Body: base64Data,
    //     ACL: "public-read",
    //     ContentEncoding: "base64", // required
    //     ContentType: `image/${type}`, // required. Notice the back ticks
    //     };

    //     // Upload to S3
    //     try {
    //         const response = await s3.upload(params).promise();

    //         // Update the image URL with the one returned from S3
    //         image = response.Location;
    //     } catch (error) {
    //         console.error("Error uploading to S3:", error);
    //         return new NextResponse("Error uploading image", { status: 500 });
    //     }

    // }

    // if the user exists, update the user
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        image,
        username,
        phone,
        imageAlt,
        bio,
        highlights,
        city,
        state,
      },
    });

    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error processing request:", error.message);

    if (error.message === "User does not exist") {
      return new NextResponse(error.message, { status: 404 });
    }

    // General error response
    return new NextResponse("Internal server error", { status: 500 });
  }
}
