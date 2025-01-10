'use client'

import { Button } from '@/components/ui/button';
import { Input } from '../components/ui/input'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [warning, setWarning] = useState<string>('')

  const signup = async() => {
    let token 
    if (!email || !username || !password) return setWarning('Please fill all the area')

    try{
        await fetch(
            `https://instagram-kaih.onrender.com/signup`,{
                method: 'POST',
                body: JSON.stringify({
                    email: email, 
                    password: password,
                    username: username,
                    profileImg: "https://i.pinimg.com/736x/10/26/73/1026734a49e1a7bdbbec411c861a69ab.jpg"
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => {
                    console.error('Error:', error);
                })
                .then(response => {
                    token = response.token;
                    console.log(token)
                    localStorage.setItem("authorization", "Bearer " + token);
                    setWarning('')
                    router.push('/posts')
                })

    
    }catch(err){
        console.log(err)
    }
  }


  return (
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
              <Input placeholder='Email' className='border-solid border-gray-500 rounded bg-zinc-900' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <Input placeholder='Name' className='border-solid border-gray-500 rounded bg-zinc-900' onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <Input type='password' placeholder='Password' className='border-solid border-gray-500 rounded bg-zinc-900' onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>

          <div>
            <Button className="bg-blue-800 text-white w-[100%] rounded" onClick={() => signup()}>
              Sign up
            </Button>
            <div className='flex items-center justfiy-center text-red-500 p-4' style={{justifyContent: 'center'}}>
              {warning}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        Have a account?  
        <button className='text-blue-700 underline' onClick={() => router.push('/login')}>Log in</button>
      </div>
    </div>

  );
}
