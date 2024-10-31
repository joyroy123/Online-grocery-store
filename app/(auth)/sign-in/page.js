"use client";

import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


function SignIn() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        const jwt = sessionStorage.getItem("jwt");
        if (jwt) {
            router.push("/");
        }
    },[]);

    const onSignIn = ()=>{
        setLoader(true);
        GlobalApi.signIn(email, password).then(resp =>{
            sessionStorage.setItem("user", JSON.stringify(resp.data.user));
            sessionStorage.setItem("jwt", resp.data.jwt);
            toast("Login Successfully");
            router.push("/");
            setLoader(false);
        }, (e)=> {
            toast(e?.response?.data?.error?.message);
            setLoader(false);
        });
    };

  return (
    <div className='flex items-baseline justify-center my-20'>
    <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
        <Image src="/logo.png" width={200} height={200} alt='logo'/>
        <h2 className='font-bold text-3xl'>Sign In to Account</h2>
        <h2 className='text-gray-500'>Enter your Email and Password to Sign In</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>

            <Input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>

            <Input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/>

            <Button onClick={()=>onSignIn()}disabled={!(email || password)}>{loader ? <LoaderIcon className='animate-spin'/> : "Sign In"}</Button>

            <p>Don't have an account? <Link href={"/create-account"} className='text-blue-500'> Create new Account</Link></p>
        </div>
    </div>
</div>
  )
}

export default SignIn;