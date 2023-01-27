import React from 'react'

const Navbar = () => {
    return (
        <section className='top-0 left-0 absolute md:w-[20%] w-[30%] bg-primary h-screen p-4 '>
            <div className='flex items-center justify-center flex-col gap-8  m-y-auto m-x-0'>
                <div className='flex items-center justify-around'>
                    <img src="\utopia.png" className="w-[3vw] text-center" alt="logo" />
                    <h1 className='text-[14px] lg:text-[20px]  text-white font-bold'>Utopia</h1>
                </div>
                <div className='flex items-center justify-around flex-col gap-2'>
                    <img src="/myAvatar.png"
                        className='w-[7vw] xl:w-[10vw] rounded-full'
                        alt="profic pic" />
                    <h1 className='text-white text-[12px] font-sans'>Khushi Shukla</h1>
                </div>
            </div>
            <div className='font-serif text-white font-light lg:text-lg md:text-md text-sm mt-16  p-4 flex justify-center items-center flex-col'>
                <ul className='space-y-3'>
                    <li>
                        <div className='flex items-center justify-left gap-2'>
                            <img src="/Profile.svg" alt="icon" />
                            <h4 className='inline'>Profile</h4>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center justify-left gap-2'>
                            <img src="/dashboard.svg" alt="icon" />
                            <h4 className='inline'>Dashboard</h4>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center justify-left gap-2'>
                            <img src="/notification.svg" alt="icon" />
                            <h4 className='inline'>Notification</h4>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center justify-left gap-2'>
                            <img src="/favourite.svg" alt="icon" />
                            <h4 className='inline'>Favourite</h4>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center justify-left gap-2'>
                            <img src="/settings.svg" alt="icon" />
                            <h4 className='inline'>Setting</h4>
                        </div>
                    </li>
                </ul>
            </div>

        </section>
    )
}

export default Navbar
