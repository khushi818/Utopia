import React from 'react'

const Auth = () => {
    return (
        <section className='overscroll-none p-10'>
            <div className='max-w-[1260px] flex items-center p-4 justify-between mx-auto my-0 border-dark border-solid border-2 rounded-md h-[90vh] m-x-0 m-y-auto bg-white'>
                {/*first section*/}
                <div className='first-section bg-primary md:w-[40%] lg:w-[40%] h-[80vh] p-4 rounded-md'>
                    <div className='flex items-center justify-left '>
                        <img src="/utopia.png" className="w-10" alt="logo"></img>
                        <h1 className='text-[12px] text-white font-semibold overflow-hidden'>UTOPIA</h1>
                    </div>
                    <div className='py-8 px-5'>
                        <h1 className='font-sans text-white font-bold md:text-[24px] lg:text-[32px]'>
                            Start your journey with new community
                        </h1>
                    </div>
                    <div className='px-5 py-0'>
                        <p
                            className='text-white font-light font-serif lg:text-[18px] md:text-[12px] text-left lg:mr-8 md:mr-3'
                        >
                            Listen to podcast with live video and chat.Meey and Join Amazing Community.
                        </p>
                    </div>
                    <div className='bg-dark md:w-full ml-5 w-full pr-2 h-[30vh] py-16'>
                        <p className='text-white font-sarif text-[18px]'>
                            I hope everyone enjoys the time here and in best collabrate with each us
                        </p>
                    </div>
                </div>
                {/*second section*/}
                <div>
                    world
                </div>
            </div>
        </section>
    )
}

export default Auth
