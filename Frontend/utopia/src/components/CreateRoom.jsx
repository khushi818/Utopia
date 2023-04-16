import { React, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'


const CreateRoom = ({ hidden, setHidden }) => {
  const [name, setName] = useState("")
  const { authToken } = useAuthContext()
  // const [ishidden, setIsHidden] = useState(hidden)

  const handleCreateRoom = async () => {
    if (name != "") {
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
        .catch((errors) => {
          console.log(errors)
          alert("log in again")
        })
      console.log(name)
      setHidden('hidden')
    }
    else {
      alert("empty name")
    }
  }

  const handleClose = (e) => {
    e.preventDefault()
    setHidden('hidden')
  }

  return (
    <div className={`model min-h-screen min-w-full flex justify-center items-center z-100 fixed top-0  ${hidden}`}>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='w-[50vw] p-5 bg-white text-left fixed z-100'>
          <div className='flex justify-between items-center text-lg font-bold'>
            <h1>Create a room</h1>
            <p className="cursor-pointer font-bold" onClick={handleClose}>X</p>
          </div>

          <div className='flex flex-col my-4'>
            <label for="name" className="mb-2 text-md font-thin text-gray-900">Title</label>
            <input type="text" id="name" name="name"
              className="border text-sm rounded-lg w-full p-2.5"
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
              placeholder="mary_go_around"
              required />
          </div>
          <button className="p-2 bg-primary rounded-md" onClick={handleCreateRoom}>Create</button>
        </div>
      </div>
    </div>

  )
}

export default CreateRoom
