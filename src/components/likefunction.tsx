'use client'

import { Heart } from 'lucide-react';
import {  useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { Decipher } from 'crypto';

type resType = {
    likes: []
}

type jwtType = {
    username: string
    userId: string
 }
 type likeTypes = {
    profileImg: string;
    username: string;
    _id: string;
  };

const LikeFunction = ({postId, likes}: {postId: string, likes: likeTypes[]}) => {
    const [likeState, setLikeState] = useState<Boolean>(false)

    const fetchToken = localStorage.getItem("authorization")

    const decoded: jwtType = jwtDecode<jwtType>(fetchToken|| '');

    const isLiked = likes.filter((like) => like._id === decoded.userId).length > 0


    const likeFunc = async () => {
        try{
            const jsonData = await fetch(
                `https://instagram-kaih.onrender.com/like`,{
                    method: 'POST',
                    body: JSON.stringify({
                        userId: decoded.userId ,
                        post: postId
                    }),
                    headers: {
                        authorization: `${fetchToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                )
            const response = await jsonData.json()
        }catch(err){
            console.log(err)
        }
        console.log(likes)
    };

    return(
        <div>
            <Heart className='after:bg-red-500' 
                onClick={() => likeFunc()}
                color={isLiked ? 'red': 'white'}
                fill={isLiked ? 'red' :'none'}
            />
        </div>
    )
}

export default LikeFunction