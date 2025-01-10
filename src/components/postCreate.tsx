// 'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  

import { CirclePlus } from 'lucide-react';

import Create from "@/custom_components/Create";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PostCreate = () => {
    const [image, setImage] = useState<any>(null); 
    
    const [postImg, setPostImg] = useState<string>('')

    const [caption, setCaption] = useState<string>('')

    const uploadImages = async() => {
      console.log('working');
  
      if (!image) return;
    
      const uploadPromises = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "sdaman");
        formData.append("cloud_name", "duogmvgzd");
    
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/duogmvgzd/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
    
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
    
        const result = await response.json();
        return result.secure_url;
      };
    
      try {
        const uploadedUrls = await uploadPromises();
        console.log(uploadedUrls);
        setPostImg(uploadedUrls)
      } catch (error) {
        console.log(error);
      }
    };

    return(
        <Dialog>
            <DialogTrigger><CirclePlus/></DialogTrigger>
            <DialogContent className="bg-black w-[80%] h-[300px]">
                <DialogHeader>
                <DialogTitle>
                    <div>
                        <Input 
                        accept="image/*"
                         type="file" 
                        onChange={(e) => {
                          const files = e.target.files;
                          console.log(files)
                          if (files) {
                            setImage(files[0]);
                          }
                        }}/>
                        <Button onClick={() => uploadImages()}>
                          Upload
                        </Button>
                        <Input onChange={(e) => setCaption(e.target.value)}/>
                        <Create caption = {caption} postImg={postImg}/>
                    </div>
                </DialogTitle>
                <DialogDescription>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PostCreate