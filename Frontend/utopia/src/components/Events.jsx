import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Room from './Room';

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

    return (
        <>
            <section className='container md:col-span-3 col-span-5 overflow-x-hidden md:overflow-y-scroll md:overscroll-auto md:overflow-x-hidden'>
                {rooms.map((room) => (
                    <Room key={room.code} room={room} />
                ))}
            </section>

        </>
    )
}

export default Events
