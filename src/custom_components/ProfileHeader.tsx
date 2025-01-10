'use client'

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";

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
type postType = {
    [key: number]: containPost;
}

 type userType = {
    username: string;
    profileImg: string;
    followers: followerType[];
    following: followerType[];
    posts: postType[]
 }

const ProfileHeader = ({user}: {user: userType} ) => {
    console.log(user.profileImg)
    return(
        <div>
            <div className="p-4">
                {user.username}
            </div>
            <div className="p-4 flex justify-between">
                <div>
                    <img src={user.profileImg || "https://i.pinimg.com/736x/10/26/73/1026734a49e1a7bdbbec411c861a69ab.jpg"} className="rounded-full" style={{width: '100px'}}/>                
                </div>
                <div className="flex items-center gap-4 p-4" >
                    <div>
                        <p className="flex justify-center">{user.posts.length}</p>
                        <p>posts</p>
                    </div>
                    <div>
                        <p className="flex justify-center">{user.followers.length}</p>
                        <p>followers</p>
                    </div>
                    <div>
                        <p className="flex justify-center">{user.following.length}</p>
                        <p>following</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader