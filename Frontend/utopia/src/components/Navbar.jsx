import React from 'react'

const Navbar = () => {
    return (
        <section className='top-0 left-0 absolute w-[30%] bg-primary h-screen p-4'>
            <div className='flex items-start justify-center flex-col gap-8'>

                <div className='flex items-center justify-center'>
                    <img src="\utopia.png" className="w-[5vw] text-center" alt="logo" />
                    <h1 className='text-[14px] lg:text-[24px]  text-white font-bold'>UTOPIA</h1>
                </div>
                <div className='flex items-center justify-center flex-col gap-2'>
                    <img src="/myAvatar.png"
                        className='w-[7vw] xl:w-[10vw] rounded-full'
                        alt="profic pic" />
                    <h1 className='text-white text-sm font-sans'>Khushi Shukla</h1>
                </div>

                <div className='font-serif text-white font-light'>
                    <ul className='space-y-3'>
                        <li>
                            <div className='flex items-center justify-around'>
                                <img src="/dashboard.svg" alt="icon" />
                                <h4 className='inline'>Profile</h4>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center justify-around'>
                                <img src="/dashboard.svg" alt="icon" />
                                <h4 className='inline'>Dashboard</h4>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center justify-around'>
                                <img src="/dashboard.svg" alt="icon" />
                                <h4 className='inline'>Notification</h4>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center justify-around'>
                                <img src="/dashboard.svg" alt="icon" />
                                <h4 className='inline'>Analytics</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Navbar
