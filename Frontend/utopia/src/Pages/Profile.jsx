import { React, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileDetails from '../components/ProfileDetails'

const Profile = () => {
    const [hidden, setHidden] = useState('hidden')
    // const [disable,setDisable] = useState(true)
    // const [createRoomHidden, setCreateRoomHidden] = useState('hidden')

    const handleEdit = (e) => {
        setHidden('hidden' ? 'block' : 'hidden')
    }

    return (
        <section className='bg-main dark:bg-dark'>
            <div className='h-screen '>
                <Navbar />
                <div className="flex flex-col justify-center max-w-full ">
                    <button
                        onClick={handleEdit}
                        className='w-24 absolute mt-2 right-10 top-0 z-10 bg-main text-dark rounded-md py-2 px-4'>
                        Edit
                    </button>
                    <button className='w-36 absolute mt-2 right-40 top-0 z-10 bg-main text-dark rounded-md py-2 px-4'>+Create Room</button>
                    <div className=' bg-primary w-full h-36 relative'>
                        <img src="/myAvatar.png" className='absolute left-20 top-20 w-28 rounded-full border border-dark' />
                        <div className='ml-48 mt-36 flex items-start flex-col'>
                            <h5 className='ml-2 text-md'>Khushi</h5>
                            <h5 className='text-sm'>@khushi818</h5>
                        </div>
                        <div>
                            <p className='text-[14px] px-20 pt-8'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis ab qui nostrum recusandae praesentium, ratione dignissimos, cupiditate, reiciendis in accusamus culpa laboriosam impedit sequi ullam voluptas soluta blanditiis deleniti earum distinctio quisquam facere optio mollitia nobis. Dolorem perferendis cumque nam eligendi
                                quaerat, dolor fugit praesentium ullam, amet minima cupiditate? Quos.
                            </p>
                        </div>
                    </div>
                    {/* slide */}
                    <div className='flex justify-around items-start mt-56 '>
                        <h4>YOUR ROOMS</h4>
                        <h4>BOOKMARKED</h4>
                    </div>
                    <div className='flex flex-col border-r pt-20 border-5 min-h-screen'>
                        <div className="border-y border-3 h-3/6 py-8 md:px-6 w-full ml-[3.35rem] px-1">
                            <div className="w-42 h-15 p-6 mr-24  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-center items-center'>
                                        <img className="w-8 rounded-full" src="/myAvatar.png" alt="user-image" />
                                        <h3 className='p-2 text-sm'>username</h3>
                                    </div>
                                    <p className='text-sm '>16 Feb, 2:00 PM</p>
                                </div>
                                <div className='p-4 font-bold text-[18px]'>
                                    <h3>JavaScript beginners!</h3>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <p className='text-sm '>8 views</p>
                                    <button className='text-sm border px-6 py-2 rounded-md hover:bg-secondary hover:text-white'>JOIN</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* model */}
            <ProfileDetails hidden={hidden} />


        </section >
    )
}

export default Profile
