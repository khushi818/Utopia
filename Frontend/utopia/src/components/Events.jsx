import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import useParams from 'react-router-dom'

const Events = () => {
    const [rooms, setRooms] = useState([])
    const dataFetchedRef = useRef(false);
    const JoinFetchRef = useRef(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (JoinFetchRef.current) return;
        JoinFetchRef.current = true;
        const requestOptions = {
            method: "GET",
            headers: { "content-Type": "application/JSON" },
        };

        fetch("http://127.0.0.1:8000/room", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setRooms(data)
                console.log(data)
            })
            .catch(error => console.log(error))
    }, [])


    const handleJoin = (code) => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const requestOptions = {
            method: "POST",
            headers: { "content-Type": "application/JSON" },
            body: JSON.stringify({
                "code": code
            })
        };

        fetch("http://127.0.0.1:8000/join-room/", requestOptions)
            .then(res => {
                if (code) {
                    if (res.ok) {
                        navigate(`/utopia_meet/${code}`)
                        console.log(res)
                    }
                }
            })
            .catch(error => console.log(error))
    }



    return (
        <>
            <section className='container md:col-span-3 col-span-5 overflow-x-hidden md:overflow-y-scroll md:overscroll-auto md:overflow-x-hidden'>
                {rooms.map((room) => (
                    <div className='flex flex-col border-r pt-20 border-5 ' key={room.code}>
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
                                    <h3>{room.name}</h3>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <p className='text-sm '>8 views</p>
                                    <button className='text-sm border px-6 py-2 rounded-md hover:bg-secondary hover:text-white'
                                        onClick={handleJoin(room.code)}
                                    >JOIN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </section>

        </>
    )
}

export default Events
