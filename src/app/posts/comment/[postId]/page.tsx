"use client"

import { ChevronLeft} from 'lucide-react';
import { Heart } from 'lucide-react';
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Commentinput from "@/components/commentInput"

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  
  const {postId} = useParams()
  const router = useRouter()

    type userId = {
        username: string;
        profileImg: string;
      };
      
      type commentType = {
        _id: string;
        userId: userId;
        comment: string;
      }[];

    const [comments, setComments] = useState<commentType>([])

    console.log(comments);

    const getComments = async () => {
      const fetchToken = localStorage.getItem("authorization")
      
      const jsonData = await fetch(
        `https://instagram-kaih.onrender.com/posts/${postId}`,
        {
            headers: {
                authorization: `${fetchToken}`,
                "Content_Type": "application/json"
            }
        }
      );

      const response = await jsonData.json();
      const comment = response.comment
      setComments(comment);
    };
  
    useEffect(() => {
      getComments();
    }, []);

    return(
        <div className='flex flex-col justify-between h-[100vh]'> 
          <div>
            <div className='flex border-b-[1px] p-2 border-gray-500'>
              <ChevronLeft onClick={() => router.back()}/>
              <div className='text-center w-[85%] font-bold'>Comments</div>
            </div>
            <div>
              {comments?.map((comment) => {
                return(
                  <div key={comment._id} className='flex items-center justify-between p-1'>
                    <div key={comment._id} className='flex items-center font-bold p-3 gap-x-2'>
                      <img className='rounded-full w-[25px]' src={comment.userId.profileImg}/>
                      <div className='flex'>
                        <div>{comment.userId.username}&nbsp; </div>
                        <div className='font-normal'>{comment.comment}</div>
                      </div>
                    </div>
                    <Heart className='px-1'/>
                  </div>
                )
              })}            
            </div>            
          </div>
          <Commentinput postId={postId} comments = {comments}/>
        </div>
    )
}

export default Page