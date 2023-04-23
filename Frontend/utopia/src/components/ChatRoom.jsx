import { useEffect, useState, useRef } from 'react'
import Pusher from 'pusher-js'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'

const ChatRoom = ({ room }) => {
    const { code } = useParams()

    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])
    const [userdata, setUserData] = useState({})
    const { authToken } = useAuthContext()
    const chatRef = useRef(false)

    useEffect(() => {
        if (chatRef.current) return
        chatRef.current = true

        Pusher.logToConsole = true;

        let pusher = new Pusher( `${process.env.REACT_APP_PUSHER_ID}`, {
            cluster: 'ap2'
        });

        if (room) {
            let channel = pusher.subscribe(`${code}`);
            channel.bind('message', function (data) {
                console.log(`data= ${JSON.stringify(data)}`)
                setChat(prevChat => [...prevChat, data])
                console.log(chat)
                setMessage("")
            })
        }
    }, [userdata])

    const handleSubmit = async (e) => {
        if (message !== "") {
            if (e.key === "Enter") {
                await fetch('http://127.0.0.1:8000/message/',
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${authToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            channel: code,
                            message
                        })
                    }).then(res => res.json())
                    .then((data) => setUserData(data))
                console.log('triggered')
            }
        }
        console.log('not triggered')
    }
    return (
        <section className='flex flex-col justify-center items-start'>
            <div className='flex flex-col gap-3  w-[25vw] h-[80vh] scroll overscroll-y-auto overscroll-x-none '>
                {chat.length && chat.map((chat, index) => {
                    return (
                        <div key={index} className={`place-self-start`}>
                            <p className='text-sm font-bold text-dark text-left'>{chat.username}</p>
                            <div className={`bg-primary text-white py-2 px-4 rounded-2xl`}>
                                {chat.message}
                            </div>
                        </div>
                    )
                })}
            </div>
           <div >
            <input className='w-[25vw] p-4 border border-dark bg-white rounded-md'
                onChange={(e) => {
                    setMessage(e.target.value)
                }}

                onKeyDown={handleSubmit}
                value={message}
                placeholder='Type.....'
            />
            </div>
        </section>
    )
}

export default ChatRoom
