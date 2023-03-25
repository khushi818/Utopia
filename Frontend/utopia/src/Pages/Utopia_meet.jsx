import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Utopia_meet = () => {
    let { code } = useParams()
    const [room, setRoom] = useState({})
    const dataFetchedRef = useRef(false);
    const leaveFetchRef = useRef(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const requestOptions = {
            method: "GET",
            headers: { "content-Type": "application/JSON" },
        };

        fetch(`http://127.0.0.1:8000/get-room?code=${code}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    // window.location.href = "/utopia-meet"
                    navigate('/utopia-meet')
                }

                return response.json()
            })
            .then((data) => {
                setRoom(data)
                console.log(data)
            })
            .catch(error => console.log(error))
    }, [])

    const handleLeave = (e) => {
        if (leaveFetchRef.current) return;
        leaveFetchRef.current = true;
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "content-Type": "application/JSON" },
        };
        fetch("http://127.0.0.1:8000/leave-room/", requestOptions,).then((_response) => {
            navigate("/utopia-meet")
            // code = null
        })
    }

    return (
        <>
            <header>
                <div className='bg-dark w-full text-center text-white'>{room.name}</div>
            </header>
            <section className='grid grid-cols-3 text-center'>
                <div className='overflow-hidden w-48 bg-white min-h-screen'>
                    <button onClick={handleLeave}>
                        Leave</button>
                    <h1>participants</h1>
                </div>
                <div>
                    video_call
                </div>
                <div>
                    <div className='min-h-screen w-56 bg-white overflow-hidden absolute right-0'>
                        chat
                    </div>
                </div>
            </section>
        </>
    )
}

export default Utopia_meet
