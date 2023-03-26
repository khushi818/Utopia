import React, { useEffect, useState } from 'react'
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { useRef } from 'react';
import Participant from './Participant';
import AgoraRTC from "agora-rtc-sdk-ng";

const config = { mode: "rtc", codec: "vp8" }
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
let localTracks = []
let remoteUsers = []
const Video = ({ participants }) => {
    const [token, setToken] = useState("")
    const [uid, setUid] = useState("")
    const renderRef = useRef(false)
    const element = useRef(null)

    useEffect(() => {
        if (renderRef.current) return;
        renderRef.current = true;
        fetch("http://127.0.0.1:8000/agora/?channel=home",
            {
                method: "GET",
                headers: { "content-Type": "application/JSON" },
            }
        ).then((res) => res.json())
            .then((data) => {
                setToken(data.token)
                setUid(data.uid)
                console.log(data.token)
            })
        handleUserJoin()
    }, [])


    const client = useClient();
    // const { ready, tracks } = useMicrophoneAndCameraTracks();

    const joinAndDisplayLocalStream = async () => {
        const app_Id = "50aa357a11604d798b12088f413a4efa"

        // client.on('user-published', handleUserJoined)
        // client.on('user-left', handleUserLeft)

        try {
            setUid(client.join(app_Id, "home", token, uid))
        } catch (error) {
            console.error(error)
            window.open('/utopia-meet', '_self')
        }

        localTracks = await AgoraRTC.createCameraVideoTrack()
        console.log(localTracks)
        localTracks.play(`user-${uid}`)
        // await client.publish(localTracks)
    }

    const handleUserJoin = () => {
        joinAndDisplayLocalStream()
    }

    return (
        <section className='min-w-full min-h-screen'>
            <div id="stream__container" className='relative flex flex-wrap items-center justify-center overflow-hidden'>
                {/* {participants.map((participant) => {
                    <participant participant={participant} uid={uid} />
                })} */}
                <Participant uid={uid} ref={element} />
                {/* <div class="video-container" id={`user-container-${uid}`} >
                    <div class="video-player" id={`user-${uid}`} ref={element}></div>
                    <div class="username-wrapper"><span class="user-name">Name</span></div>
                </div> */}
                {/* <Participant uid={uid} /> */}
            </div>
            <div id="buttons" className='grid fixed bottom-2 grid-cols-4 gap-6 left-[45%]'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" /></svg>
                </button>
                <button class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" /></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" /></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" /></svg>
                </button>
            </div>
        </section>
    )
}

export default Video
