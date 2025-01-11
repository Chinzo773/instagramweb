"use client";

import { useState, useEffect } from "react";

import { Send } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LikeInfo from '@/components/likeInfoDialogue'
import PostCreate from "@/components/postCreate";
import LikeFunction from "@/components/likefunction";
import Follow from "@/custom_components/Follow";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NavBar from "@/custom_components/NavBar";

type userId = {
  _id: string
  username: string;
  profileImg: string;
};

type commentTypes = {
  comment: string
};


type likeTypes = {
  profileImg: string;
  username: string;
  _id: string;
};

type postType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: userId;
  comment: commentTypes[];
  likes: likeTypes[];
  createdAt: string
}[];

const Page = () => {
  const router = useRouter()

  const [posts, setPosts] = useState<postType>([]);
  const [likeState, setLikeState] = useState<Boolean>(false)

  const getPosts = async () => {
    const fetchToken = localStorage.getItem("authorization")


    const jsonData = await fetch(
      "https://instagram-kaih.onrender.com/posts",
      {
          headers: {
              authorization: `${fetchToken}`,
              "Content-Type": "application/json"
          }
      }
  )
    const response = await jsonData.json();
    setPosts(response);

    console.log(response)
  
  };

  useEffect(() => {
    getPosts();
  }, [likeState]);

  return (
        <div className="flex flex-col h-[200vh] items-center relative">
          {posts?.map((post) => {
            const date = new Date(post.createdAt)
            const month = date.toLocaleDateString('default', {month: 'long'})
            const day = date.getDate()

            return (
              <Card key={post._id} className="w-fit flex-col-reverse border-none pb-5">
                <CardHeader className="px-4">
                  <CardTitle className="flex justify-between">
                    <div className="flex gap-x-3" onClick={() => router.push(`/profile/${post.userId._id}`)}>
                      <img className="w-7 h-7 rounded-full" src={post.userId.profileImg}/>
                      {post.userId.username}
                    </div>
                    <Follow followId={post.userId._id}/>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img src={post.postImg} className="w-[500px]" />
                </CardContent>
                <CardFooter className="flex-col p-4">
                  <div className="flex w-full justify-between ">
                    <div className="flex space-x-1">
                      <div className="flex gap-x-1">
                        <LikeFunction postId={post._id} likes={post.likes} setLikeState={setLikeState}/>
                        <LikeInfo count = {post.likes.length} likes = {post.likes}/>
                                
                      </div>
                      <div className="flex gap-x-1">
                        <MessageCircle onClick={() => router.push(`/posts/comment/${post._id}`)}/>
                          {post.comment.length}
                      </div>
                      <div>
                        <Send/>                    
                      </div>
                    </div>
                    <Bookmark/>
                  </div>
                </CardFooter>
                <CardDescription className="flex flex-col px-4 gap-1">
                  <div>
                    {post.caption} 
                  </div>
                  <div className="text-gray-500 text-xs">
                    {month + '-' + day}
                  </div>
                  </CardDescription>
              </Card>
            )
          })}
          <NavBar/>
        </div>
  );
};

export default Page;