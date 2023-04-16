import React from 'react'
import Navbar from '../components/Navbar'
import Events from '../components/Events'
import Activity from '../components/Activity'
import ProfileEdit from '../components/ProfileEdit'

const Profile_setting = () => {
    return (
        <section section className='bg-main dark:bg-dark' >
            <div className='h-screen '>
                <Navbar />
            </div>

            <ProfileEdit/>           
        </section>
    )
}

export default Profile_setting
