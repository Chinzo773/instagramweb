'use client'

import ProfileHeader from '@/custom_components/ProfileHeader';
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import ProfilePosts from '@/custom_components/ProfilePosts';
import NavBar from '@/custom_components/NavBar';
import { useParams } from 'next/navigation';

type containType = {
    _id: string
    username: string
}
type containPost = {
    _id: string
    caption: string
    postImg: string
}

type followerType = {
    [key: number]: containType;
};


 type userType = {
    username: string;
    profileImg: string;
    followers: followerType[];
    following: followerType[];
    posts: containPost[]
 }

 type jwtType = {                                                                                     
    username: string
    userId: string
 }

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
    const [user, setUser] = useState<userType>({
        username: '',
        profileImg: '',
        followers: [],
        following: [],
        posts: []
      });
    const {userId} = useParams()

    const getUser = async() => {
        const fetchToken = localStorage.getItem("authorization")

        const jsonData = await fetch(
          "https://instagram-kaih.onrender.com/user/posts",
          {    
            method: "POST",
            body: JSON.stringify({
                userId: `${userId}`
            }),
              headers: {
                  authorization: `${fetchToken}`,
                  "Content-Type": "application/json"
              }
          }
          )
        const response = await jsonData.json()

        setUser(response)
        console.log(response)
        console.log(user)
    }

    useEffect(() => {
        getUser();
    }, []);    


    return(
        <div>
            <div>
                <ProfileHeader user={user}/>
            </div>
            <div>
                <ProfilePosts user={user}/>
            </div>
            <NavBar/>
        </div>
    )
}

export default Page 