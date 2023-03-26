import React from 'react'
import { useRef } from 'react'

const Participant = ({ uid, ref }) => {

    return (
        <>
            <div class="video-container" id={`user-container-${uid}`} >
                <video class="video-player" id={`user-${uid}`} ref={ref}>
                </video>
                <div class="username-wrapper"><span class="user-name">Name</span></div>
            </div>
        </>
    )
}

export default Participant
