"use client"

import { IPostDocument } from "@/mongodb/models/post"
import { SignedIn, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route"
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route"
import CommentForm from "./CommentForm"
import CommentFeed from "./CommentFeed"

function PostOptions({ post }: { post: IPostDocument }) {
   const { user } = useUser()
   const [isCommentOpen, setIsCommentOpen] = useState(false)
   const [liked, setLiked] = useState(false)
   const [likes, setLikes] = useState(post.likes)

   useEffect(() => {
      if (user?.id && post.likes?.includes(user.id)) {
         setLiked(true)
      }
   }, [post, user])

   async function likeOrUnlikePost() {
      if (!user?.id) {
         throw new Error("User not authenticated")
      }

      const originalLiked = liked
      const originalLikes = likes

      const newLikes = liked
         ? likes?.filter((like) => like !== user.id)
         : [...(likes ?? []), user.id]

      const body: LikePostRequestBody | UnlikePostRequestBody = {
         userId: user.id
      }

      setLiked(!liked)
      setLikes(newLikes)

      const response = await fetch(`/api/posts/${post._id}/${liked ? "unlike" : "like"}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      })

      if (!response.ok) {
         setLiked(originalLiked)
         setLikes(originalLikes)

         throw new Error("Failed to Like or Unlike post")
      }

      const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`)

      if (!fetchLikesResponse.ok) {
         setLiked(originalLiked)
         setLikes(originalLikes)

         throw new Error("Failed to fetch Likes")
      }

      const newLikedData = await fetchLikesResponse.json()

      setLikes(newLikedData)
   }

   return (
      <div>
         <div className="flex justify-between p-4">
            <div>
               {likes && likes.length > 0 && (
                  <p className="text-xs text-gray-500 cursor-pointer hover:underline">
                     {likes.length} {likes.length === 1 ? "like" : "likes"}
                  </p>
               )}
            </div>

            <div>
               {post?.comments && post.comments.length > 0 && (
                  <p
                     onClick={() => setIsCommentOpen(!isCommentOpen)}
                     className="text-xs text-gray-500 cursor-pointer hover:underline"
                  >
                     {post.comments.length} comments
                  </p>
               )}
            </div>
         </div>

         <div className="flex p-2 justify-between px-2 border-t">
            <Button
               variant="ghost"
               className="postButton"
               onClick={likeOrUnlikePost}
            >
               <ThumbsUpIcon
                  className={cn("mr-1", liked && "text-[#4881C2] fill-[#4881C2]")}
               />
               Like
            </Button>

            <Button
               variant="ghost"
               className="postButton"
               onClick={() => setIsCommentOpen(!isCommentOpen)}
            >
               <MessageCircle
                  className={cn("mr-1", isCommentOpen && "text-gray-600 fill-gray-600")}
               />
               Comment
            </Button>

            <Button variant="ghost" className="postButton">
               <Repeat2 className="mr-1" />
               Repost
            </Button>

            <Button variant="ghost" className="postButton">
               <Send className="mr-1" />
               Send
            </Button>
         </div>

         {isCommentOpen && (
            <div className="p-4">
               <SignedIn>
                  <CommentForm postId={post._id} />
               </SignedIn>

               <CommentFeed post={post} />
            </div>
         )}
      </div>
   )
}

export default PostOptions