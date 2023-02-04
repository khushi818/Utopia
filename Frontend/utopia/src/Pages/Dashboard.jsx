import React from 'react'
import Navbar from '../components/Navbar'
import Events from '../components/events'
import Activity from '../components/Activity'

const Dashboard = () => {
    return (
        <div className='flex justify-center items-center'>
            <Navbar />
            <Events />
            <Activity />
        </div>
    )
}

export default Dashboard
