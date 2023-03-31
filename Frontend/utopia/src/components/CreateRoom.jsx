import { React, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
const CreateRoom = ({ hidden }) => {
  const [name, setName] = useState("")
  const { authToken } = useAuthContext()
  // const [ishidden, setIsHidden] = useState(hidden)

  const handleCreateRoom = async () => {
    await fetch('http://127.0.0.1:8000/createroom/',
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      }).then(res => res.json())
      .then((data) => {
        console.log(data)
        if (data.name) {
          console.log(`${data.name} is created`)
        }
      })
      .catch((errors) => console.log(errors))
    console.log(name)
  }
  const handleClose = (e) => {
    //   setIsHidden(false)
  }

  return (
    <div className={`model h-full w-full z-102 fixed top-0 overflow-auto ${hidden}`}>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='w-[50vw] p-5 bg-white text-left'>
          <div className='flex justify-between items-center'>
            <h1>Create a room</h1>
            <p onClick={handleClose}>X</p>
          </div>

          <div className='flex flex-col my-4'>
            <label for="name" className="mb-2 text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="name" name="name"
              className="border text-sm rounded-lg w-full p-2.5"
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
              placeholder="mary_go_around"
              required />
          </div>
          <button onClick={handleCreateRoom}>Create</button>
        </div>
      </div>
    </div>

  )
}

export default CreateRoom
