import React from 'react'
import Navbar from '../components/Navbar'
import Events from '../components/Events'
import Activity from '../components/Activity'

const Dashboard = () => {
    return (
        // <div className='flex justify-center items-center'>
        <div className='bg-main dark:bg-dark'>
            <div className='grid grid-cols-4 h-screen'>
                <Navbar />
                <Events />
                <Activity />
            </div>
        </div>
    )
}

export default Dashboard
