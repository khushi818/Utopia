import React from 'react'
import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Activity = () => {
    const [search , setSearch] = useState("")
    const [rooms,setRooms] = useState([])
    const navigate = useNavigate()
           
    const handleSearch =(e)=>{
       if (e.key === "Enter"){
        const requestOptions = {
            method: "GET",
            headers: { "content-Type": "application/JSON" },
        };

        fetch(`http://127.0.0.1:8000/find/?search=${search}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setRooms(data)
                console.log(data)
            })
            .catch(error => console.log(error))
        }
    }
    return (
        <section className='hidden md:block'>
            <div className='flex  items-center justify-center flex-col '>
                <div>
                    <div className="pt-2 relative mx-auto text-gray-600">
                        <input className="border-2 border-gray-300 bg-white h-10 ml-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="search" name="search"
                             onChange={(e)=> setSearch(e.target.value)}
                             onKeyDown={handleSearch}
                            placeholder="Search" />
                        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                            <img src="/search.svg" alt="search" />
                        </button>
                    </div>
                </div>
            </div>
             {rooms.map((room) => {
                        return (       
                                <div key= {room.code} id = "room-box" className={`w-[10vw] p-6`}>
                                    <div className='flex justify-between flex-col'>
                                    <h1 className='space-y-4 font-semibold text-grey'>{room.name}</h1>
                                    <button className='cursor-pointer space-y-4 px-6 py-2 border border-primary rounded-md hover:bg-secondary hover:text-white'
                                    onClick = {()=> navigate(`/utopia_meet/${room.code}`)}>
                                        Join</button>
                                    </div>
                                </div>
                        )
                    })}                   
        </section>
    )
}

export default Activity
