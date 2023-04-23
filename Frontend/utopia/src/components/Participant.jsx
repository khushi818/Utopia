import React from 'react'
import { useEffect } from 'react'

const Participant = ({ user}) => {
    const vidDiv = React.createRef()
    const playVideo = () => {
        user.videoTrack.play(`user-${user.uid}`)
    }
    const stopVideo = () => {
        user.videoTrack.stop()
    }
    useEffect(() => {
        playVideo()
        return () => {
            stopVideo()
        }
    }, [])
    return (
        <>
            <div class="video-container" id={`user-container-${user.uid}`} ref={vidDiv}>
                <div class="video-player" id={`user-${user.uid}`}></div>
                <div class="username-wrapper"><span class="user-name">{user.username}</span></div>
            </div>
        </>
    )
}

export default Participant
