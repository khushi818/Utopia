import React, { useEffect, useState } from 'react'


const ProfileEdit = () => {
    const [image,setImage] = useState(null)
    const [firstName,setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [caption, setCaption] = useState("")
    const [about , setAbout] = useState("")

    const handleSubmit = async() =>{
        const requestOption ={
            method :"PUT",
            headers: { 
                "Authorization": `Bearer ${authToken}`,               
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                image_url : image,
                first_name: firstName,
                last_name: LastName,
                caption: caption,
                about: about,
             })
        }

        await fetch("http://127.0.0.1:8000/api/user/profile" , requestOption)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
        }).catch(error => console.log(error))
    }

  return (
    <div>
        <h1></h1>
    </div>
  )
}

export default ProfileEdit
