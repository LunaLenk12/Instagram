"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabaseClient } from "../supabase/client"
import { Grand_Hotel } from "next/font/google"

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
})

const InstagramGlyph = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-md" aria-hidden="true">
    <defs>
      <radialGradient id="igGlyphGradient" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285aeb" />
      </radialGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="url(#igGlyphGradient)" />
    <rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="24" cy="24" r="6.5" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="32" cy="16" r="1.8" fill="#fff" />
  </svg>
)

const Page = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const supabase = supabaseClient()

  const handleFile = async (e) => {
    console.log(e.target.files[0])
    setFile(e.target.file)
    setPreview(URL.createObjectURL(e.target.files[0]))
    const response = await supabase.storage
      .from("Image-Upload")
      .upload(`images/${e.target.files[0].name}`, e.target.files[0])

    const { data } = supabase.storage
      .from("Image-Upload")
      .getPublicUrl(`images/${e.target.files[0].name}`)

    console.log(data)
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        background:
          "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      }}
    >
      <div className="w-full max-w-[450px] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <InstagramGlyph />
          <h1 className="text-base font-semibold text-neutral-900">Create new post</h1>
          <div className="w-10" />
        </div>

        {/* Upload area */}
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
              <p className="text-xl font-light text-neutral-900">Drag photos here</p>
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

        {/* Footer */}
        <div className="flex items-center justify-center py-3">
          <span
            className={`${grandHotel.className} bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text pb-1 text-3xl leading-tight text-transparent`}
          >
            Instagram
          </span>
        </div>
      </div>
    </div>
  )
}

export default Page