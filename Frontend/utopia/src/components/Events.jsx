import { useState, useEffect } from 'react'
const Events = () => {
    const [room, setRoom] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/room/', {
            'method': 'GET',
            header: {
                'Content-Type': 'application/Json',
            }
        })
            .then(res => res.json())
            .then(res => setRoom(res))
            .catch(error => console.log(error))
    }, [])

    return (
        // <Navbar>
        <section className='flex items-center justify-center flex-col w-[50vw] pt-[8rem]'>
            <div className='w-[100%] bg-grey p-8 rounded-xl'>
                <div className='flex justify-between items-center '>
                    <div className='flex justify-center items-center'>
                        <img className="w-8 rounded-full" src="/myAvatar.png" alt="user-image" />
                        <h3 className='p-2 text-sm text-white'>username</h3>
                    </div>
                    <p className='text-sm text-white'>16 Feb, 2:00 PM</p>
                </div>
                <div className='p-4 font-bold text-[18px] text-white'>
                    <h3>JavaScript beginners!</h3>
                </div>
                <div className='flex justify-between items-center '>
                    <p className='text-sm text-white'>8 views</p>
                    <button className='text-sm bg-main px-6 py-2 rounded-md hover:bg-secondary hover:text-white'>JOIN</button>
                </div>
            </div>
        </section>
    )
}

export default Events
