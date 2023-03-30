import React, { useEffect, useState, useRef } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import { createClient, createCameraVideoTrack, createCustomAudioTrack } from "agora-rtc-react";
import { useNavigate, useParams } from 'react-router-dom'
import Video from '../components/Video'
import { useClient, useUsers, useStart } from '../context/MeetContext'

const Utopia_meet = () => {
    let { code } = useParams()
    let [participants, setParticipants] = useState([])
    const [room, setRoom] = useState({})
    const dataFetchedRef = useRef(false);
    const leaveFetchRef = useRef(false)
    const navigate = useNavigate();
    const [token, setToken] = useState(null)
    const [uid, setUid] = useState("")
    const renderRef = useRef(false)
    // let { rtc } = useClient()
    const rtc = useRef({
        // For the local client.
        client: null,
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
    });
    let [users, setUsers] = useUsers()
    let [start, setStart] = useStart()


    useEffect(() => {
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
        init()
    }, [room])

    /* host */
    let init = async () => {
        const app_Id = "50aa357a11604d798b12088f413a4efa"
        rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        initClientEvents()
        const UID = await rtc.current.client.join(app_Id, "home", token, uid);
        // Create an audio track from the audio sampled by a microphone.
        rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a video track from the video captured by a camera.
        rtc.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        //Adding a User to the Users State
        setUsers((prevUsers) => {
            return [...prevUsers, { uid: UID, audio: true, video: true, client: true, videoTrack: rtc.current.localVideoTrack }]
        })
        //Publishing your Streams
        await rtc.current.client.publish([rtc.current.localAudioTrack, rtc.current.localVideoTrack]);
        setStart(true)
    }

    /* remote client*/
    const initClientEvents = () => {
        rtc.current.client.on("user-published", async (user, mediaType) => {
            // New User Enters
            await rtc.current.client.subscribe(user, mediaType);
            if (mediaType === "video") {
                const remoteVideoTrack = user.videoTrack;
                setUsers((prevUsers) => {
                    return [...prevUsers, { uid: user.uid, audio: user.hasAudio, video: user.hasVideo, client: false, videoTrack: remoteVideoTrack }]
                })
            }

            if (mediaType === "audio") {
                const remoteAudioTrack = user.audioTrack;
                remoteAudioTrack.play();
                setUsers((prevUsers) => {
                    return (prevUsers.map((User) => {
                        if (User.uid === user.uid) {
                            return { ...User, audio: user.hasAudio }
                        }
                        return User
                    }))
                })
            }
        });

        rtc.current.client.on("user-unpublished", (user, type) => {
            //User Leaves
            if (type === 'audio') {
                setUsers(prevUsers => {
                    return (prevUsers.map((User) => {
                        if (User.uid === user.uid) {
                            return { ...User, audio: !User.audio }
                        }
                        return User
                    }))
                })
            }
            if (type === 'video') {
                setUsers((prevUsers) => {
                    return prevUsers.filter(User => User.uid !== user.uid)
                })
            }
        });
    }

    /* fetch room*/
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const requestOptions = {
            method: "GET",
            headers: { "content-Type": "application/JSON" },
        };

        fetch(`http://127.0.0.1:8000/get-room?code=${code}`, requestOptions)
            .then((response) => response.json())
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
            navigate("/")
        })
    }

    return (
        <>
            <header>
                <div className='bg-dark w-full text-center text-white'>{room.name}</div>
            </header>
            <section className='grid grid-cols-4 text-center'>
                <div className='overflow-hidden w-48 bg-white min-h-screen'>
                    <button onClick={handleLeave} className="w-24 bg-red p-2 mt-2 rounded-sm">Leave</button>
                    <h1>participants</h1>
                </div>
                <div className='col-span-2 min-h-screen'>
                    video_conference
                    <Video participants={participants} />
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
