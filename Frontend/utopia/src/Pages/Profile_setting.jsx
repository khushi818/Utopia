import React from 'react'
import Navbar from '../components/Navbar'
import ProfileEdit from '../components/ProfileEdit'

const Profile_setting = () => {
    return (
        <section section className='bg-main dark:bg-dark' >
            <div className='h-screen '>
                <Navbar />
                <div className='min-w-full flex justify-center items-center'>
                <ProfileEdit/>
                </div> 
            </div>          
        </section>
    )
}

export default Profile_setting
