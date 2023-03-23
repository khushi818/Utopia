import React, { useState } from 'react'

const ProfileDetails = ({ hidden }) => {
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")

    return (
        <div className={`model h-full w-full z-102 fixed top-0 overflow-auto ${hidden}`}>
            <div className='flex justify-center items-center w-full h-full'>
                <div className='w-[50vw] p-5 bg-white text-left'>
                    <h1>Edit Profile</h1>
                    <div className='flex flex-col my-4'>
                        <label for="username" className="mb-2 text-sm font-medium text-gray-900">UserName</label>
                        <input type="text" id="username" name="username"
                            className="border text-sm rounded-lg w-full p-2.5"
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            value={userName}
                            placeholder="mary_go_around"
                            required />
                    </div>
                    <div className='flex flex-col  my-4'>
                        <label for="bio"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="bio"
                            rows="4"
                            className="block p-2.5 w-full text-sm 
                            text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write about yourself"></textarea>
                    </div>
                    <div className='mt-5'>
                        <button type="submit" className="text-white bg-secondary hover:text-dark  hover:bg-white border hover:border-dark focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails
