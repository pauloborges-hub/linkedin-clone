import connectDB from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
   user: IUser;
   text: string;
   imageUrl?: string | null;
}

export async function POST(request: Request) {
   auth.protect();

   try {
      await connectDB();
      
      const { user, text, imageUrl }: AddPostRequestBody = await request.json();
      const postData: IPostBase = {
         user,
         text,
         ...(imageUrl && { imageUrl })
      };
      const post = await Post.create(postData);

      return NextResponse.json({
         message: "Post create successfully",
         post
      });
   } catch (error) {
      return NextResponse.json(
         { error: `An error occurred while creating the post: ${error}` },
         { status: 500 }
      );
   }
}

export async function GET(request: Request) {
   try {
      await connectDB();

      const posts = await Post.getAllPosts();

      return NextResponse.json({ posts });
   } catch (error) {
      return NextResponse.json(
         { error: "An error ocurred while fetching posts" },
         { status: 500 }
      );
   }
}