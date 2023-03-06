import React from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const Navbar = () => {
    const { logoutUser } = useContext(AuthContext)

    return (
        <div className="sidebar fixed bg-main min-h-screen w-[3.35rem] z-10 overflow-hidden border-r md:hover:w-56  hover:shadow-lg ">
            <div className="flex h-screen flex-col justify-between pt-2 pb-6 text-grey ">
                <div>
                    <div className="w-max">
                        <img src="\utopia.png" className="w-14 inline" alt="Logo" />
                        <span>UTOPIA</span>
                    </div>

                    <ul className="mt-16 space-y-2 tracking-wide">

                        <li className="min-w-max">
                            <a href="#" className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
                                <img src="/dashboard.svg" className="inline p-1 text-grey" alt="dash-icon" />
                                <span className="group-hover:text-gray-700">Dashboard</span>
                            </a>
                        </li>
                        <li className="min-w-max">
                            <a href="#" className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
                                <img src="/notification.svg" className="inline p-1 text-grey" alt="notify-icon" />
                                <span className="group-hover:text-gray-700">Notification</span>
                            </a>
                        </li>
                        <li className="min-w-max">
                            <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                                <img src="/favourite.svg" className="inline p-1 text-grey" alt="icon" />
                                <span className="group-hover:text-gray-700">Bookmarks</span>
                            </a>
                        </li>
                        <li className="min-w-max">
                            <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                                <img src="/Profile.svg" className="inline p-1 text-grey" alt="icon" />
                                <span className="group-hover:text-gray-700">Profile</span>
                            </a>
                        </li>

                    </ul>
                </div>
                <div className="w-max -mb-3">
                    <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:fill-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                        </svg>
                        <span className="group-hover:text-gray-700">Settings</span>
                    </a>
                    <button onClick={logoutUser}>logout</button>
                </div>
            </div>
        </div>
    )
}
// inside page dashboard
export default Navbar
