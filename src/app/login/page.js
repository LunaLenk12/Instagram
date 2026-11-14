"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabaseClient } from "../supabase/client"
import { toast } from "@/components/ui/toast"
import { Grand_Hotel } from "next/font/google"

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
})

const InstagramGlyph = () => (
  <svg
    viewBox="0 0 48 48"
    className="h-14 w-14 drop-shadow-md"
    aria-hidden="true"
  >
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
    <rect
      x="11"
      y="11"
      width="26"
      height="26"
      rx="8"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
    />
    <circle cx="24" cy="24" r="6.5" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="32" cy="16" r="1.8" fill="#fff" />
  </svg>
)

const Page = () => {
  const supabase = supabaseClient()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({ email: "", password: "", username: "" })

  const handleUserInfo = (event) => {
    if (event.target.name === "email") {
      setUserInfo({ ...userInfo, email: event.target.value })
    }
    if (event.target.name === "password") {
      setUserInfo({ ...userInfo, password: event.target.value })
    }
  }

  const login = async () => {
    const response = await supabase.auth.signInWithPassword({
      email: userInfo.email,
      password: userInfo.password,
    })
    
    toast.add({
      title: "Congrats Welcome",
      type: "success",
      description: "You have successfully logged in",
    })
    setTimeout(() => router.push("create-post"), 1000)
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3 px-4"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        background:
          "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      }}
    >
      {/* Login card */}
      <div className="w-full max-w-[350px] rounded-xl bg-white px-10 pb-8 pt-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-4 flex flex-col items-center">
          <InstagramGlyph />
          <h1
            className={`${grandHotel.className} mt-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text pb-2 text-center text-6xl leading-tight text-transparent`}
          >
            Instagram
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <Input
            placeholder="Email"
            onChange={(e) => handleUserInfo(e)}
            value={userInfo.email}
            name="email"
            className="h-9 rounded-sm border-neutral-300 bg-neutral-50 px-2 text-xs placeholder:text-neutral-500 focus-visible:border-[#dc2743] focus-visible:ring-1 focus-visible:ring-[#dc2743]"
          />

          <Input
            placeholder="Password"
            onChange={(e) => handleUserInfo(e)}
            value={userInfo.password}
            name="password"
            type={"password"}
            className="h-9 rounded-sm border-neutral-300 bg-neutral-50 px-2 text-xs placeholder:text-neutral-500 focus-visible:border-[#dc2743] focus-visible:ring-1 focus-visible:ring-[#dc2743]"
          />

          <Button
            onClick={login}
            className="mt-2 h-9 w-full rounded-lg border-0 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Log in
          </Button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4">


          <div className="h-px flex-1 bg-neutral-300" />
        </div>
      </div>

      {/* Sign up card */}
      <div className="flex w-full max-w-[350px] items-center justify-center rounded-xl bg-white py-5 text-sm shadow-2xl">
        <span className="text-neutral-900">Don't have an account?</span>
        <Button
          variant="link"
          onClick={() => router.push("/signup")}
          className="h-auto p-0 pl-1 text-sm font-semibold text-[#dc2743] hover:no-underline"
        >
          Create account
        </Button>
      </div>
    </div>
  )
}
export default Page