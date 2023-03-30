import React, { useEffect, useState } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import { useUsers, useClient } from '../context/MeetContext';
import { useRef } from 'react';
import Participant from './Participant';

const Video = ({ participants }) => {
    const users = useUsers()[0]
    const [setUsers] = useState()
    let rtc = useClient()

    return (
        <section className='min-w-full min-h-screen'>
            <div id="stream__container" className='relative flex flex-wrap items-center justify-center overflow-hidden'>
                {users.length && users.map((user) => {
                    return (
                        < Participant key={user.uid} user={user} />
                    )
                })}
            </div>
        </section >
    )
}

export default Video
