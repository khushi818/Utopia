import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const ProfileEdit = () => {
    const [image,setImage] = useState(null)
    const [imageURL,setImageURL] = useState(null)
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [caption, setCaption] = useState("")
    const [about , setAbout] = useState("")
    const { authToken } = useAuthContext()
      
    const options = ['developer', 'medical' , 'engineer' , 'others']

    const handleSubmit = async() =>{
        const formData = new FormData();
        formData.append('image', image);
        const requestOption ={
            method :"PUT",
            headers: { 
                "Authorization": `Bearer ${authToken}`,               
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                image_url : imageURL,
                first_name: firstName,
                last_name: lastName,
                caption: caption,
                about: about,
             })
        }

        await fetch("http://127.0.0.1:8000/api/user/profile/" , requestOption)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
        }).catch(error => console.log(error))
          console.log("submitted")
    }

  return (
    <section id = "profile setting"  className='flex flex-col h-screen w-[70%] gap-2 justify-center items-center'>
      <div id = "image-select" className='flex gap-2 justify-center items-center'>
          <img src = {imageURL} alt = "blank" className='w-32 rounded-full'/>
          <label for = "avatar">Image:</label>
          <input type="file"id="avatar" name="avatar"
          accept="image/png, image/jpeg, image.jpg"
          onChange={(e)=> {
              console.log(e.target.files[0]) 
              setImage(e.target.files[0])
              setImageURL(URL.createObjectURL(e.target.files[0]))
          }} 
          className='space-x-4'  
          />
      </div>
      <div id = "First_Name" className='flex gap-2 justify-center items-center'>
          <label for = "firstName"> Name : </label> 
            <input
             type = "text"
             placeholder='first name'
             value = {firstName}
             onChange={(e)=>setFirstName(e.target.value)}
             className=''
            />
             <input
             type = "text"
             placeholder='lastName'
             value = {lastName}
             onChange={(e)=>setLastName(e.target.value)}
            />    
      </div>
      <div className='about'>
          <label for="message" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
          < textarea
          id="message" 
          rows="4" 
          className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
           placeholder="Write your thoughts here..."
           value = {about}
           onChange={(e)=> setAbout(e.target.value)}
          />
      </div>
       <div id = "caption">
          <label for = "select">Caption</label> 
          <select onChange={(e)=> setCaption(e.target.value)}>
            {
              options.map((option,idx) =>{
                return(
                  <option key = {idx}>
                     {option}
                  </option>
                )
              })
            }
          </select>       
       </div>

       <div>
         <button onClick={handleSubmit}>Update</button>
         <button>Cancel</button>
       </div>
      <div>

      </div>
              
    </section>
  )
}

export default ProfileEdit
