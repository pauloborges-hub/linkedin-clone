"use server"

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server"

export default async function createPostAction(formData: FormData) {
   // Protects the route in case the user is not logged in
   const user = await currentUser();

   if (!user) {
      throw new Error("User not authenticated");
   }

   const postInput = formData.get("postInput") as string;
   const image = formData.get("image") as File;
   let imageUrl: string | undefined;

   if (!postInput) {
      throw new Error("You must provide a post input");
   }

   // define user
   const userDB: IUser = {
      userId: user.id,
      userImage: user.imageUrl,
      firstName: user.firstName || "",
      lastName: user.lastName || ""
   }

   try {
      if (image.size > 0) {
         // upload image if there is one - MS Blob Storage
         // create post in database with image
      }
      else {
         // create post in database without image
         const body: AddPostRequestBody = {
            user: userDB,
            text: postInput
         };

         await Post.create(body);
      }
   } catch (error: any) {
      throw new Error("Failed to create post", error);
   }

   // create post in database


   // Step 4: revalidatePath '/' - homePage
}