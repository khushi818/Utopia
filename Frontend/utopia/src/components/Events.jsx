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
        <div className='flex items-center justify-center flex-col'>
            {room.map((r) => {
                return <h1>{r.name}</h1>
            })}
        </div>
    )
}

export default Events
