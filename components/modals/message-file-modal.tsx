"use client"


import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios'
import * as z from 'zod';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from '@/components/ui/dialog';
import { 
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormMessage 
} from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';


const formSchema = z.object({
    name: z.string().min(1,{
        message: "NAME YOUR SERVER FIRST。"
    }),
    // imageUrl: z.string().min(1,{
    //     message: "GIMME PICS"
    // })
});



export const MessageFileModal = () =>{
    const [isMounted,setIsMounted] = useState(false);

    const router = useRouter();

    const { isOpen,onClose,type,data } = useModal();

    const isModalOpen = isOpen && type === "messageFile"

    const form = useForm({
        resolver: zodResolver(formSchema),  
        defaultValues:{
            name:"",
            imageUrl:"/home",
        }
    });


    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            
            
            form.reset();
            router.refresh();
            window.location.reload();

        }catch (err){
            console.log(err)
        }

    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center'>
                        Create your own Discrod Serverada
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        blah blah blah
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                    className='space-y-8'>
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                TODO: upload image thingy
                            </div>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) =>(
                                    <FormItem>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500
                                        dark:text-secondary/70'>
                                            Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 
                                                focus-visible:ring-0 text-black 
                                                focus-visible:ring-offset-0'
                                                placeholder='Enter Server Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button disabled={isLoading} variant={'primary'}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}