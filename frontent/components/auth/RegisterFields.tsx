"use client"
import { icons } from '@/constants/icons'
import { RegisterForm } from '@/types/form';
import { registerValidator } from '@/types/zod';
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import Image from 'next/image';
import { registerUser } from '@/http/userHttp';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Toast from '../toast/index';

const RegisterFields: React.FC = () => {
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const router = useRouter();
    const { handleSubmit, control, reset } = useForm<RegisterForm>({
        resolver: zodResolver(registerValidator),
        defaultValues: {
            password: '',
            username: '',
            email: '',
        }
    })

    const onSubmit = async (data: RegisterForm) => {
        try{
            await registerUser(data);
            toast.custom(
                <Toast
                    icon={icons.successIcon}
                    success
                    text='User Registaration is successfull'
                />,{
                position : "bottom-right",
                duration : 3000,
            }) 
            reset();
            router.replace("/auth/login");
        }catch(err:any){
            toast.custom(
                <Toast
                    icon={icons.errorIcon}
                    success={false}
                    text={err.message}
                />,{
                position : "bottom-right",
                duration : 3000,
            }) 
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 p-5'>
            <div className='flex flex-col gap-6 text-left'>
                <Controller
                    name='username'
                    control={control}
                    render={({ field: { onChange, value, name }, fieldState: { error } }) => (<>
                        <Input
                            value={value}
                            onChange={val => onChange(val.target.value)}
                            name={name}
                            placeholder='Username'
                        />
                        {error && <p className='text-sm text-red-300'>{error.message}</p>}
                    </>)}
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, value, name }, fieldState: { error } }) => (<>
                        <Input
                            value={value}
                            onChange={val => onChange(val.target.value)}
                            name={name}
                            type='email'
                            placeholder={'Email'}
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
            <button className='mt-5 rounded-3xl bg-green-400 p-2 font-bold hover:bg-green-500 cursor-pointer'>Register</button>
        </form>
    )
}

export default RegisterFields