import { React, useState } from 'react'

const CreateRoom = ({ hidden }) => {
  const [title, setTitle] = useState("")
  const handleClose = (e) => {

  }
  return (

    <div className={`model h-full w-full z-102 fixed top-0 overflow-auto ${hidden}`}>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='w-[50vw] p-5 bg-white text-left'>
          <div className='flex justify-between items-center'>
            <h1>Edit Profile</h1>
            <p>X</p>
          </div>

          <div className='flex flex-col my-4'>
            <label for="title" className="mb-2 text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="title" name="title"
              className="border text-sm rounded-lg w-full p-2.5"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              value={title}
              placeholder="mary_go_around"
              required />
          </div>
        </div>
      </div>
    </div>

  )
}

export default CreateRoom
