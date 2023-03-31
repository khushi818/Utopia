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
    const [hidden, setHidden] = useState(false)
    let rtc = useClient()
    let [users, setUsers] = useUsers()
    let [start, setStart] = useStart()


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/agora/?channel=${code}`,
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
        // init()
    }, [room])

    /* host */
    let init = async () => {
        const app_Id = "50aa357a11604d798b12088f413a4efa"
        rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        initClientEvents()
        const UID = await rtc.current.client.join(app_Id, room.code, token, uid);
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

    const JoinHandle = () => {
        init()
        setHidden(true)
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


    const handleVideo = (e) => {
        const [user, ...rest] = users
        user.video = !user.video
        rtc.current.localVideoTrack.setEnabled(user.video);
        setUsers([user, ...rest])
    }

    const handleaudio = (e) => {
        const [user, ...rest] = users
        user.audio = !user.audio
        rtc.current.localAudioTrack.setEnabled(user.audio);
        users = [user, ...rest]
        setUsers(users)
    }

    const handleLeave = async (e) => {
        // Destroy the local audio and video tracks.
        await rtc.current.localAudioTrack.close();
        await rtc.current.localVideoTrack.close();
        await rtc.current.client.leave();
        sessionStorage.removeItem('uid')
        navigate("/")
        setUsers([])
        setStart(false)
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
                <div className='col-span-2 min-h-screen m-10'>
                    {/* video_conference */}
                    <button onClick={JoinHandle} className={`${hidden ? 'hidden' : ''} p-4 bg-primary text-white w-18`}>JoinStream</button>
                    <Video participants={participants} />

                </div>
                <div>
                    <div className='min-h-screen w-56 bg-white overflow-hidden absolute right-0'>
                        chat
                    </div>
                </div>

                <div id="buttons" className='grid text-center fixed bottom-2 grid-cols-4 gap-6 left-[45%]'>
                    <button className='bg-red p-3' onClick={handleVideo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" /></svg>
                    </button>
                    <button className='bg-red p-3' onClick={handleaudio} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" /></svg>
                    </button>
                    <button className='bg-red p-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" /></svg>
                    </button>
                    <button className=' bg-red p-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" /></svg>
                    </button>
                </div>
            </section>
        </>
    )
}

export default Utopia_meet
