import { React, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import CreateRoom from '../components/CreateRoom'
import { useAuthContext } from '../context/AuthContext'

const Profile = () => {
    const [hidden, setHidden] = useState('hidden')
    const [disable, setDisable] = useState(false)
    const [dropdown,setDropdown] = useState(false)
    const [rooms, setRooms] = useState([])
    const { authToken } = useAuthContext()
    const navigate = useNavigate()

    const handleCreateEdit = (e) => {
        setHidden('block')
        setDisable(true)
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/myrooms", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                setRooms(data)
                console.log(rooms)
            }).catch(errors => {
                navigate('/login')
                console.log(errors)
            })
    }, [authToken])

    return (
        <section id = "profile-section" className='bg-main dark:bg-dark'>

            <div className='relative z-0' >
                {/* model */}
                <div className='relative z-30'>
                    <CreateRoom hidden={hidden} setHidden={setHidden} disable={setDisable} />
                </div>

                <Navbar />

                <div className="flex flex-col justify-center items-center max-w-full">
                    <button
                        // onClick={handleProfileEdit}
                        className={` ${disable ? 'disabled' : ''} bg-primary w-24 absolute mt-2 right-10 top-0 z-10  text-white rounded-md py-2 px-41`}>
                        Edit
                    </button>

                    <button className={`${disable ? 'disabled' : ''} w-36 absolute mt-2 right-40 top-0 z-10 bg-primary text-white rounded-md py-2 px-4`}
                        onClick={handleCreateEdit}
                    >+ Create Room
                    </button>

                     
                    <div id = "profile-container" className='flex justify-center items-center mt-32 flex-col gap-4'>
                        <img src="/myAvatar.png" className=' w-32 rounded-full border border-dark' />
                        <div className='flex items-center flex-col'>
                            <h5 className='text-lg text-center'>Khushi</h5>
                            <h5 className='text-sm'>@khushi818</h5>
                        </div>
                        <div>
                            <p className='text-[14px] px-20 pt-8 max-w-4xl text-center'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis ab qui nostrum recusandae praesentium, ratione dignissimos, cupiditate, reiciendis in accusamus culpa laboriosam impedit sequi ullam voluptas soluta blanditiis deleniti earum distinctio quisquam facere optio mollitia nobis. Dolorem perferendis cumque nam eligendi
                                quaerat, dolor fugit praesentium ullam, amet minima cupiditate? Quos.
                            </p>
                        </div>
                    </div>
                    
                    
                    <div id = "room-accordian" className='grid w-[70vw] justify-center items-center'>
                    <div className='w-[70vw] mt-8 bg-white '>
                        <div className='p-6 flex justify-between bg-grey  rounded-md'>
                            <h1 className='text-md font-semibold '>MY ROOMS</h1>
                            <img src = "/dropdown.svg" className='cursor-pointer w-8' 
                            onClick = {()=>{
                                setDropdown(!dropdown)
                            }}/>
                        </div>
                    {<p>..Loading</p> && rooms.map((room) => {
                        return (       
                                <div id = "room-box" className={`w-[50vw] p-6 ${dropdown ? 'block': 'hidden'}  ml-[5rem]`}>
                                    <div className='flex justify-between'>
                                    <h1 className='space-y-4 font-semibold text-grey'>{room.name}</h1>
                                    <button className='cursor-pointer space-y-4 px-6 py-2 border border-primary rounded-md hover:bg-secondary hover:text-white'>Join</button>
                                    </div>
                                    <p className='text-sm font-thin'>{room.created_at}</p>
                                </div>
                        )
                    })}
                    </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Profile
