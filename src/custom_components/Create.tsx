'use client'

import { Button } from "@/components/ui/button"
import { jwtDecode } from "jwt-decode"

type jwtType = {                                                                                     
    username: string
    userId: string
 }

const Create = ({ postImg, caption }: { postImg:string, caption:string }) => {    

    const postCreation = async() => {
        const fetchToken = localStorage.getItem('authorization')

        const decoded: jwtType = jwtDecode<jwtType>(fetchToken || '')

        try{
            await fetch(
                'https://instagram-kaih.onrender.com/posts/create',{
                    method: 'POST',
                    body: JSON.stringify({
                        postImg: postImg,
                        caption: caption,
                        userId: decoded.userId
                    }),
                    headers:{
                        authorization: `${fetchToken}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(postImg)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Button onClick={() => postCreation()}>
            Create
        </Button>
    )
}

export default Create