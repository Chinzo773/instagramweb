'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { stringify } from 'querystring';
import { useState } from 'react';
import { json } from 'stream/consumers';

export default function Page() {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [warning, setWarning] = useState<string>('')


    const goTo = () => {
        router.push('/')
    }

    const login = async() => {
        let token 

        if (!email || !password) return setWarning('Please fill all the area')

        try{
            await fetch(
                `https://instagram-kaih.onrender.com/login`,{
                    method: 'POST',
                    body: JSON.stringify({
                        email: email, 
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(error => {
                        console.error('Error:', error);
                    })
                    .then(response => {
                        if (response == 'Password invalid'){
                            setWarning('Password Invalid')
                        }else if(response.message == "User not found"){
                            setWarning("User doesn't exist")
                        }else{
                            token = response;
                            console.log(token)
                            localStorage.setItem("authorization", "Bearer " + token);
                            router.push('/posts')
                        }
                })

        
        }catch(err){
            console.log(err)
        }

    }


    return(
        <div className='flex h-screen justify-center items-center flex-col'>
            <div className='flex border-solid border-white-500 w-[350px] h-[650px] justify-center flex-col gap-20'>
                    <div className='flex justify-center'>
                        <div className='text-4xl'>
                            Instagram
                        </div>
                    </div>

                    <div className='flex flex-col gap-16 '>
                    <div className='flex flex-col gap-2 '>
                        <div>
                        <Input placeholder='Email' className='border-solid border-gray-500 rounded' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                        <Input type='password' placeholder='Password' className='border-solid border-gray-500 rounded' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <Button className="bg-blue-800 text-white w-[100%] rounded" onClick={() => login()}>
                            Log in
                        </Button>
                        <div className='flex items-center justfiy-center text-red-500 p-4' style={{justifyContent: 'center'}}>
                            {warning}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                Don't have a account?  
                <button className='text-blue-700 underline' onClick={goTo}>Sign up</button>
            </div>
        </div>
    )
}