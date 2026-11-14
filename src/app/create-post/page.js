"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabaseClient } from "../supabase/client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast,} from "@/components/ui/toast"
import { useRouter } from "next/navigation"


const Page = () => {
const [file, setFile] = useState(null)
const [caption, setCaption] = useState("")
const [uploadedImgUrl, setUploadedImgUrl] = useState(null)
const supabase = supabaseClient()
const router = useRouter()
const handleFile = async (e) => {
    setFile(e.target.file);
    const response = await supabase.storage
    .from("Image-Upload")
    .upload(`images/${e.target.files[0].name}`, e.target.files[0]);

    const { data } = supabase.storage.
    from("Image-Upload")
    .getPublicUrl(`images/${e.target.files[0].name}`);
    console.log(data)

    setUploadedImgUrl(data.publicUrl) 
};

const handleCaptionValue = (e) => setCaption(e.target.value)

const handlePost = async () => {
  const response = await supabase.from("posts").insert({
    imageUrl: uploadedImgUrl,
    caption: caption,
  })
  console.log(response,"hii")
  if (response.success) {
    toast.add({
      type:"success",
      description: "You have successfully uploaded your post"
    })
    setTimeout(() => router.push("/"), 1000)
  }else {
    toast.add({
      type:"error",
      description: "error please try again"
    })
  }
}



    return (
        <div>
            <Input type={"file"} onChange={(e) => handleFile(e)}/>
            <Textarea placeholder="Description..." value={caption} onChange={(e) => handleCaptionValue(e)}/>
            <Button onClick={handlePost}>Post</Button>
        </div>
    )
}

export default Page