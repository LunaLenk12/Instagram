// "use client"

// import { useEffect, useState } from "react";
// import { supabaseClient } from "./supabase/client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"  
// import { formatDistanceToNowStrict } from "date-fns";

// export default function Home() {
// const [posts, setPosts] = useState([])
// const supabase = supabaseClient()

// const getPosts = async () => {
//   const response = await supabase.from("posts").select("*, profile(username, profile_img)")
//   setPosts(response.data)

// }

// useEffect(() => {
// getPosts()
// },[])
//   return (
//   <div>
//    {
//    posts.map((post) => {
//       return (
//         <div key={post.id}>
//           <div key={post.id} className="flex flex-row">
//             <Avatar>
//                <AvatarImage src={post.profile.profile_img} />
//                 <AvatarFallback>{post.profile.username.slice(0, 2)}</AvatarFallback>
//             </Avatar>

//             <div>{post.profile.username}</div>

//             <div>{formatDistanceToNowStrict(post.created_at, {  addSuffix: true }  )}</div>
//           <img src={post.imageUrl} width={300} height={400}/>
//           <div>{post.caption}</div>
//           </div>
//         </div>
//       )
    
//     })
//   }
//   </div>
//   );
// }

"use client"

import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNowStrict } from "date-fns";
import { Grand_Hotel } from "next/font/google"

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
const [posts, setPosts] = useState([])
const supabase = supabaseClient()

const getPosts = async () => {
  const response = await supabase.from("posts").select("*, profile(username, profile_img)")
  setPosts(response.data)

}

useEffect(() => {
getPosts()
},[])
  return (
  <div
    className="min-h-screen"
    style={{
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      background:
        "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    }}
  >
   {/* Top bar */}
   <div className="sticky top-0 z-10 flex h-14 items-center justify-center border-b border-neutral-200 bg-white shadow-md">
     <span
       className={`${grandHotel.className} bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text pb-1 text-4xl leading-tight text-transparent`}
     >
       Instagram
     </span>
   </div>

   {/* Feed */}
   <div className="mx-auto flex w-full max-w-[470px] flex-col gap-5 px-3 py-6">
   {
   posts.map((post) => {
      return (
        <div key={post.id} className="overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Post header */}
          <div key={post.id} className="flex flex-row items-center gap-3 px-3 py-2.5">
            <div className="rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
              <div className="rounded-full border-2 border-white">
                <Avatar className="h-8 w-8">
                   <AvatarImage src={post.profile.profile_img} />
                    <AvatarFallback className="text-xs uppercase">{post.profile.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="text-sm font-semibold text-neutral-900">{post.profile.username}</div>

            <div className="text-sm text-neutral-500">
              • {formatDistanceToNowStrict(post.created_at, {  addSuffix: true }  )}
            </div>
          </div>

          {/* Image */}
          <img src={post.imageUrl} className="max-h-[585px] w-full bg-neutral-100 object-cover" />

          {/* Caption */}
          <div className="px-3 pb-4 pt-3 text-sm text-neutral-900">
            <span className="mr-1.5 font-semibold">{post.profile.username}</span>
            {post.caption}
          </div>
        </div>
      )

    })
  }
  </div>
  </div>
  );
}