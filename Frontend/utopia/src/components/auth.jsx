import { useState } from 'react'

const Auth = (props) => {


    return (
        <section className='overscroll-none p-10'>
            <div className='max-w-[80vw] flex items-center p-4 justify-between mx-auto my-0 border-dark border-solid border-2 rounded-md h-[90vh] m-x-0 m-y-auto bg-white'>
                {/*first section*/}
                <div className='first-section  justify-around flex-col item-center bg-primary w-[40%] h-[85vh] p-4 rounded-md hidden md:flex'>
                    <div className='flex items-center justify-left '>
                        <img src="/utopia.png" className="w-10" alt="logo"></img>
                        <h1 className='text-[12px] text-white font-semibold overflow-hidden'>UTOPIA</h1>
                    </div>
                    <div className='px-5'>
                        <h1 className='font-sans text-white font-bold md:text-[24px] lg:text-[24px] xl:text-[32px]'>
                            Start your journey with new community
                        </h1>
                    </div>
                    <div className='px-5 mt-8'>
                        <p
                            className='text-white font-light font-serif xl:text-[32px] lg:text-[18px] md:text-[18px] text-left lg:mr-8 md:mr-3'
                        >
                            Listen to podcast with live video and chat.Meey and Join Amazing Community.
                        </p>
                    </div>
                    <div className='ml-5 mt-8 rounded-md bg-secondary'>
                        <p className='text-white font-sans md:text-[12px] lg:text-[18px] xl:text-[24px] p-4'>
                            I hope everyone enjoys the time here and in best collabrate with each us
                        </p>
                        <div className='flex items-center justify-left gap-4 p-4'>
                            <img src="/myAvatar.png" className="w-[5vw] rounded-full" alt="pic" />
                            <div>
                                <p className='text-[14px] italic text-light text-white'>Khushi Shukla</p>
                                <p className='text-[14px] italic text-light text-white'>Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*second section*/}
                <div className='w-[60%] pl-4 m-[20%] md:m-0'>
                    {props.children}
                </div>
            </div>
        </section>
    )
}

export default Auth
