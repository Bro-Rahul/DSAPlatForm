"use client"
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidator } from '@/types/zod'
import { LoginForm } from '@/types/form'
import { Input } from '../ui/input'
import Image from 'next/image'
import { icons } from "@/constants/icons"
import { loginUser } from '@/http/userHttp'
import { toast } from 'react-hot-toast'
import Toast from '../toast'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"



const LoginFields = () => {
    const router = useRouter();
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const { handleSubmit, control, reset } = useForm<LoginForm>({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            password: '',
            email: ''
        }
    })

    const onSubmit = async (data: LoginForm) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
    
        if (result?.error) {
            toast.custom(<Toast icon={icons.errorIcon} success={false} text={result.error} />, {
                duration: 3000,
                position: "bottom-right"
            });
        } else {
            toast.custom(<Toast icon={icons.successIcon} success text='Login Success' />, {
                duration: 3000,
                position: "bottom-right"
            });
            reset();
            router.replace("/");
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-5'>
            <div className='flex flex-col gap-6 text-left'>
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, value, name }, fieldState: { error } }) => (<>
                        <Input
                            value={value}
                            onChange={val => onChange(val.target.value)}
                            name={name}
                            type='email'
                            placeholder='Email'
                        />
                        {error && <p className='text-sm text-red-300'>{error.message}</p>}
                    </>)}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field: { onChange, value, name }, fieldState: { error } }) => (
                        <div className="relative">
                            <Input
                                value={value}
                                onChange={val => onChange(val.target.value)}
                                type={viewPassword ? 'text' : 'password'}
                                name={name}
                                placeholder="Password"
                                className="pr-10"
                            />
                            <Image
                                alt="password-icon"
                                width={20}
                                height={20}
                                src={viewPassword ? icons.openEyeIcon : icons.closeEyeIcon}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
                                onClick={() => setViewPassword(prev => !prev)}
                            />
                            {error && <p className="text-sm text-red-300 mt-1">{error.message}</p>}
                        </div>

                    )}
                />
            </div>
            <button className='mt-5 rounded-3xl bg-green-400 p-2 font-bold hover:bg-green-500 cursor-pointer'>Login</button>
        </form>
    )
}

export default LoginFields


/* try {
    const response = await loginUser(data);
    toast.custom(<Toast icon={icons.successIcon} success text='Login Success'/>,{
        duration : 3000,
        position : "bottom-right"
    });
    setUserData(response);
    reset();
    router.replace("/");
} catch (err: any) {
    toast.custom(<Toast icon={icons.errorIcon} success={false} text={err.message}/>,{
        duration: 3000,
        position : "bottom-right"
    })
} */