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

        let pusher = new Pusher('3b09562247736515bfb2', {
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
        <>
            <div className='space-y-12 grid grid-cols-1 p-5 overscroll-y-auto'>
                {chat.length && chat.map((chat, index) => {
                    return (
                        <div key={index} className={`place-self-start space-y-1`}>
                            <p className='text-sm font-bold text-white text-left'>{chat.username}</p>
                            <div className={`bg-dark text-white py-2 px-4 rounded-2xl`}>
                                {chat.message}
                            </div>
                        </div>
                    )
                })}
            </div>

            <input className='w-[50vw] p-4 border border-dark bg-white absolute bottom-0 right-2 left-1  rounded-md'
                onChange={(e) => {
                    setMessage(e.target.value)
                }}

                onKeyDown={handleSubmit}
                value={message}
                placeholder='Type.....'
            />
        </>
    )
}

export default ChatRoom
