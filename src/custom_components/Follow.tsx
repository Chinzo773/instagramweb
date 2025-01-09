'use client'
import { jwtDecode } from "jwt-decode";

type jwtType = {
    username: string
    userId: string
 }

const Follow = ({followId}: {followId: string}) => {
    const follow = async() => {
        const fetchToken = localStorage.getItem("authorization")

        const decoded: jwtType = jwtDecode<jwtType>(fetchToken || '');

        console.log(followId)
        console.log(decoded.userId)

        const jsonData = await fetch(
          "https://instagram-kaih.onrender.com/user/follow",
          {    
            method: "POST",
            body: JSON.stringify({
                userId: decoded.userId,
                followId: followId
            }),
              headers: {
                  authorization: `${fetchToken}`,
                  "Content-Type": "application/json"
              }
          }
          )
        const response = await jsonData.json()
        console.log(response)
    }

    return(
        <div>
            <button onClick={() => follow()}>Follow</button>
        </div>
    )
}

export default Follow