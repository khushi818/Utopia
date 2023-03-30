import React from 'react'
import { useRef } from 'react'

const Participant = ({ user }) => {
    return (
        <>
            <div class="video-container" id={`user-container-${user.uid}`} >
                <div class="video-player" id={`user-${user.uid}`}></div>
                <div class="username-wrapper"><span class="user-name">Name</span></div>
            </div>
        </>
    )
}

export default Participant
