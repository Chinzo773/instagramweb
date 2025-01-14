'use client'

import PostCreate from "@/components/postCreate"
import { House } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

type jwtType = {                                                                                     
    username: string
    userId: string
 }

const NavBar = () => {
    const router = useRouter()

    const fetchToken = localStorage.getItem("authorization")
    const decoded: jwtType = jwtDecode<jwtType>(fetchToken|| '');
    
    return(
        <div className="fixed bottom-0 xl:h-[100vh] w-full xl:w-[200px] left-0 z-50 h-12 bg-black border-t border-gray-500 p-3 px-10 xl:p-3 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex xl:flex-col justify-between items-center w-[100%] xl: gap-10 xl: h-[100%] Logo">
                Instagram
                <House onClick={() => router.push('/posts')}/>
                <PostCreate/>
                <img src="https://i.pinimg.com/736x/10/26/73/1026734a49e1a7bdbbec411c861a69ab.jpg" className="w-[24px]  rounded-full" style={{width: '24px'}} onClick={() => router.push(`/profile/${decoded.userId}`)}/>
            </div>
        </div>
    )
}

export default NavBar