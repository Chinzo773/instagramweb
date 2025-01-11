'use client'

import { Heart } from 'lucide-react';
import {  SetStateAction, useState } from 'react';
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

const LikeFunction = ({postId, likes, setLikeState}: {postId: string, likes: likeTypes[], setLikeState: React.Dispatch<React.SetStateAction<Boolean>>}) => {

    const fetchToken = localStorage.getItem("authorization")

    const decoded: jwtType = jwtDecode<jwtType>(fetchToken|| '');

    const isLiked = likes.filter((like) => like._id === decoded.userId).length > 0


    const likeFunc = async () => {
        try{
            setLikeState(true)
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
            setLikeState(false)
        }catch(err){
            console.log(err)
            setLikeState(false)
        }
        console.log(likes)
    };

    return(
        <div>
            <Heart 
                onClick={() => likeFunc()}
                color={isLiked ? 'red': 'white'}
                fill={isLiked ? 'red' :'none'}
            />
        </div>
    )
}

export default LikeFunction