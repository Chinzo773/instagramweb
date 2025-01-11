'use client'

import {jwtDecode} from 'jwt-decode'
import { Grid2x2 } from 'lucide-react';
import { wrap } from 'module';

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
    followers: followerType[];
    following: followerType[];
    posts: containPost[]
 }

const ProfilePosts = ({user} : {user:userType}) => {

    return(
        <div>
            <div className='p-4 flex justify-center'>
                <Grid2x2/>
            </div>

            <div className='flex flex-wrap p-[1px]' style={{display:'flex' ,gap: '1px', width: '100%', borderBottomColor: 'gray', borderStyle: 'thick', flexWrap: 'wrap'}}>
                {user.posts?.map((post) => {
                    return(
                        <div key={post._id} style={{width: '33%'}}>
                            <img src={post.postImg} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfilePosts