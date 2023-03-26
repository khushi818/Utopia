import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Room = ({ room }) => {
    const { code } = useParams()
    const navigate = useNavigate()


    /* To join room */
    const handleJoin = (e) => {
        e.preventDefault();
        // if (dataFetchedRef.current) return;
        // dataFetchedRef.current = true;
        const requestOptions = {
            method: "POST",
            headers: { "content-Type": "application/JSON" },
            body: JSON.stringify({
                "code": room.code
            })
        };

        fetch("http://127.0.0.1:8000/join-room/", requestOptions)
            .then(res => {
                if (res.ok) {
                    navigate(`/utopia_meet/${room.code}`)
                    console.log(res)
                }

            })
            .catch(error => console.log(error))
    }
    return (
        <div>
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
                                onClick={handleJoin}
                            >JOIN</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Room
