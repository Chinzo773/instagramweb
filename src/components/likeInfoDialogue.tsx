'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  type likeTypes = {
    profileImg: string;
    username: string;
    _id: string;
  };
  

const LikeInfo = ({count, likes}: {count: number; likes: likeTypes[]}) => {

    return(
        <Dialog>
        <DialogTrigger>{count}</DialogTrigger>
        <DialogContent className="bg-black w-[80%] h-[300px]" >
            <DialogHeader>
            <DialogTitle className="flex flex-col gap-4">
                {likes?.map((like) => {
                    return (
                        <div key={like._id} className="flex items-center gap-2">
                            <img className="rounded-full w-[16px]" src={like.profileImg}/>
                            <div key={like._id}>{like.username}</div>    
                        </div>     
                    )
                })}
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}

export default LikeInfo