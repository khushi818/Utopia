import React from 'react'
import Navbar from '../components/Navbar'
import Events from '../components/Events'
import Activity from '../components/Activity'

const Profile_setting = () => {
    return (
        <div className='bg-main dark:bg-dark'>
            <div className='grid grid-cols-4 h-screen'>
                <Navbar />
            </div>
        </div>
    )
}

export default Profile_setting
