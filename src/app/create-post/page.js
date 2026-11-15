// "use client"
// import { Input } from "@/components/ui/input"
// import { useState } from "react"
// import { supabaseClient } from "../supabase/client"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { toast,} from "@/components/ui/toast"
// import { useRouter } from "next/navigation"


// const Page = () => {
// const [file, setFile] = useState(null)
// const [caption, setCaption] = useState("")
// const [uploadedImgUrl, setUploadedImgUrl] = useState(null)
// const supabase = supabaseClient()
// const router = useRouter()
// const handleFile = async (e) => {
//     setFile(e.target.file);
//     const response = await supabase.storage
//     .from("Image-Upload")
//     .upload(`images/${e.target.files[0].name}`, e.target.files[0]);

//     const { data } = supabase.storage.
//     from("Image-Upload")
//     .getPublicUrl(`images/${e.target.files[0].name}`);
//     console.log(data)

//     setUploadedImgUrl(data.publicUrl) 
// };

// const handleCaptionValue = (e) => setCaption(e.target.value)

// const handlePost = async () => {
//   const response = await supabase.from("posts").insert({
//     imageUrl: uploadedImgUrl,
//     caption: caption,
//   })
//   console.log(response,"hii")
//   if (response.success) {
//     toast.add({
//       type:"success",
//       description: "You have successfully uploaded your post"
//     })
//     setTimeout(() => router.push("/"), 1000)
//   }else {
//     toast.add({
//       type:"error",
//       description: "error please try again"
//     })
//   }
// }



//     return (
//         <div>
//             <Input type={"file"} onChange={(e) => handleFile(e)}/>
//             {file && <img src={URL.createObjectURL(file)}/>}
//             <Textarea placeholder="Description..." value={caption} onChange={(e) => handleCaptionValue(e)}/>
//             <Button onClick={handlePost}>Post</Button>
//         </div>
//     )
// }

// export default Page

"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabaseClient } from "../supabase/client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { Grand_Hotel } from "next/font/google"

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
})

const Page = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [caption, setCaption] = useState("")
  const [uploadedImgUrl, setUploadedImgUrl] = useState(null)
  const supabase = supabaseClient()
  const router = useRouter()

  const handleFile = async (e) => {
    setFile(e.target.file)
    setPreview(URL.createObjectURL(e.target.files[0]))
    const response = await supabase.storage
      .from("Image-Upload")
      .upload(`images/${e.target.files[0].name}`, e.target.files[0])

    const { data } = supabase.storage
      .from("Image-Upload")
      .getPublicUrl(`images/${e.target.files[0].name}`)
    console.log(data)

    setUploadedImgUrl(data.publicUrl)
  }

  const handleCaptionValue = (e) => setCaption(e.target.value)

  const handlePost = async () => {
    const response = await supabase.from("posts").insert({
      imageUrl: uploadedImgUrl,
      caption: caption,
    })
    console.log(response, "hii")
    if (response.success) {
      toast.add({
        type: "success",
        description: "You have successfully uploaded your post",
      })
      setTimeout(() => router.push("/"), 1000)
    } else {
      toast.add({
        type: "error",
        description: "error please try again",
      })
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-8"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        background:
          "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      }}
    >
      <div className="w-full max-w-[820px] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2.5">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-16 text-left text-2xl leading-none text-neutral-900"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-base font-semibold text-neutral-900">Create new post</h1>
          <Button
            onClick={handlePost}
            variant="link"
            className="h-auto w-16 justify-end p-0 text-sm font-semibold text-[#dc2743] hover:no-underline"
          >
            Share
          </Button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Image area */}
          <div className="w-full md:w-[480px] md:shrink-0">
            <label
              htmlFor="file-upload"
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 bg-neutral-50"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <>
                  <svg
                    viewBox="0 0 97.6 77.3"
                    className="h-20 w-20 text-neutral-900"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" />
                    <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.2 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.6c-.6.7-1.4 1.1-2.3 1.2-.9.1-1.8-.2-2.5-.8L10.1 35 5 17.9c-.1-2.5.7-4.9 2.2-7.1zM92.5 52l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" />
                    <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" />
                  </svg>
                  <p className="text-xl font-light text-neutral-900">Select a photo to share</p>
                  <span className="rounded-lg bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90">
                    Select from computer
                  </span>
                </>
              )}
            </label>

            <Input
              id="file-upload"
              type={"file"}
              onChange={(e) => handleFile(e)}
              className="hidden"
            />
          </div>

          {/* Caption area */}
          <div className="flex flex-1 flex-col border-t border-neutral-200 md:border-l md:border-t-0">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-sm">
                  👤
                </div>
              </div>
              <span
                className={`${grandHotel.className} bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-2xl leading-tight text-transparent`}
              >
                Instagram
              </span>
            </div>

            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => handleCaptionValue(e)}
              className="min-h-[160px] flex-1 resize-none rounded-none border-0 px-4 text-base shadow-none placeholder:text-neutral-500 focus-visible:ring-0"
            />
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 pb-2 text-neutral-400">
              <span className="text-xs">{caption.length}/2,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page