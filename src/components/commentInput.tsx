'use client'

import { Input } from '@/components/ui/input'
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

type jwtType = {
    username: string
    userId: string
 }

const Commentinput = ({ postId, comments }: { postId: any; comments: Array<any> }) => {
    const [comment, setComment] = useState<string>('')
    const [refresh, setRefresh] = useState<number>(0)


    const sendComment = async() => {
        if (!comment) return

        const fetchToken = localStorage.getItem("authorization")

        const decoded: jwtType = jwtDecode<jwtType>(fetchToken|| '');
        
        try{
            await fetch(
                `https://instagram-kaih.onrender.com/comment`,{
                    method: "POST",
                    body: JSON.stringify({
                        userId: decoded.userId,
                        comment: comment,
                        postId: postId
                    }),
                    headers: {
                        authorization: `${fetchToken}`,
                        "Content-Type": 'application/json'
                    }
            }).then(res => {
                comments.push(comment)
                setComment('')
            })
        }catch(err){
            console.log(err)
        }


    }

    // useEffect(() => {
    //     sendComment();
    // }, [refresh]);

    return(
        <div className='flex items-center p-3'>
            <img src='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className='h-7 w-7 rounded-full'/>
            <Input className='border-none text-gray-500' placeholder='Add a comment' onChange={(e) => setComment(e.target.value)}/>
            <ArrowUp className='bg-blue-500 rounded-full w-[60px]' values={comment} onClick={() => sendComment()}/>
        </div>
    )
}

export default Commentinput