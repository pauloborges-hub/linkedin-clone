"use client"

import { useUser } from "@clerk/nextjs"
import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import createCommentAction from "@/actions/createCommentAction"
import { toast } from "sonner"

function CommentForm({ postId }: { postId: string }) {
   const { user } = useUser()
   const ref = useRef<HTMLFormElement>(null)

   const createCommentActionWithPostId = createCommentAction.bind(null, postId)

   async function handleCommentAction(formData: FormData): Promise<void> {
      if (!user?.id) {
         throw new Error("User not authenticated")
      }

      const formDataCopy = formData
      ref.current?.reset()

      try {
         // server action
         await createCommentActionWithPostId(formDataCopy)
      } catch (error) {
         console.error(`Error creating comment: ${error}`)
      }
   }

   return (
      <form
         ref={ref}
         action={(formData) => {
            const promise = handleCommentAction(formData)

            // Toast
            // Toast notification based on the promise above 
            toast.promise(promise, {
               loading: "Adding comment...",
               success: "Comment added",
               error: "Failed to comment on the post"
            })
         }}
         className="flex items-center space-x-1"
      >
         <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
               {user?.firstName?.charAt(0)}
               {user?.lastName?.charAt(0)}
            </AvatarFallback>
         </Avatar>

         <div className="flex flex-1 bg-white border rounded-full px-3 py-2">
            <input
               type="text"
               name="commentInput"
               placeholder="Add a comment..."
               className="outline-none flex-1 text-sm bg-transparent"
            />
            <button type="submit" hidden>
               Comment
            </button>
         </div>
      </form>
   )
}

export default CommentForm