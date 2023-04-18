import { React, useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate , Link} from 'react-router-dom'
import CreateRoom from '../components/CreateRoom'
import { useAuthContext } from '../context/AuthContext'

const Profile = () => {
    const myrooms = JSON.parse(localStorage.getItem('data')) 
    const [hidden, setHidden] = useState('hidden')
    const [disable, setDisable] = useState(false)
    const [dropdown,setDropdown] = useState(false)
    const [rooms, setRooms] = useState([])
    const [data, setData] = useState([])
    const { authToken, userData ,UserDetails } = useAuthContext()
    const navigate = useNavigate()

    const handleCreateEdit = (e) => {
        setHidden('block')
        setDisable(true)
    }

    useEffect(() => {
        UserDetails()
        if(userData)
        {
            console.log(userData)
            fetch(`http://127.0.0.1:8000/api/user/profile/${userData.username}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((data) => { 
                 setData(data)
                 console.log(data)
            }).catch(errors => {
                console.log(errors)
            })
        }

        fetch("http://127.0.0.1:8000/myrooms", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('data', JSON.stringify(data))
                console.log(myrooms)
                // setRooms(myrooms)
                setRooms(data)
                console.log(rooms)
            }).catch(errors => {
                navigate('/login')
                console.log(errors)
            })
    }, [])


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
                        className={` ${disable ? 'disabled' : ''} bg-primary w-24 absolute mt-2 right-10 top-0 z-10  text-white rounded-md py-2 px-41`}>
                        <Link to = "/setting/profile">Edit</Link>
                    </button>

                    <button className={`${disable ? 'disabled' : ''} w-36 absolute mt-2 right-40 top-0 z-10 bg-primary text-white rounded-md py-2 px-4`}
                        onClick={handleCreateEdit}
                    >+ Create Room
                    </button>

                     
                    <div id = "profile-container" className='flex justify-center items-center mt-32 flex-col gap-4'>
                        <img src={data.image_url} className=' w-32 rounded-full border border-dark' />
                        <div className='flex items-center flex-col'>
                            <h5 className='text-lg text-center'>{data.first_name + '' + data.last_name}</h5>
                            <h5 className='text-sm'>{'@' + data.username}</h5>
                        </div>
                        <div>
                            <p className='text-[16px] px-20 max-w-4xl text-center'>
                               {data.caption}
                            </p>
                            <p className='text-[14px] px-20 pt-3 max-w-4xl text-center'>
                               {data.about}
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
