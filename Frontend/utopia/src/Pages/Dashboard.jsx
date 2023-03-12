import React from 'react'
import Navbar from '../components/Navbar'
import Events from '../components/Events'
import Activity from '../components/Activity'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
    const { isAuthenticated } = useAuthContext()
    return (
        <>
            {isAuthenticated ? <div className='flex justify-center items-center'>
                <div className='bg-main dark:bg-dark'>
                    <div className='grid grid-cols-4 h-screen'>
                        <Navbar />
                        <Events />
                        <Activity />
                    </div>
                </div>
            </div> : <Navigate to="/login" />
            }
        </>

    )
}

export default Dashboard
