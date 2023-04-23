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
         const formData = new FormData()
         formData.append('image', image)
         formData.append('first_name', firstName)
         formData.append('last_name' , lastName )
         formData.append('about', about)
         formData.append('caption',caption)
        const requestOption ={
            method :"PUT",
            headers: { 
                "Authorization": `Bearer ${authToken}`,               
             },
             body: formData
        }

        await fetch("http://127.0.0.1:8000/api/user/profile/" , requestOption)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            console.log("submitted")
        }).catch(error => {
          console.log(error)
          console.log("Please try again")
        })
          
    }

    const clearData =(e) =>{
         e.preventDefault()
         setFirstName("")
         setLastName("")
         setAbout("")
         setCaption("")
         setImageURL("")
    }

  return (
    <section id = "profile setting"  className='flex flex-col h-screen w-[70%] gap-2 justify-center items-center'>
      <h1 className='font-bold text-left text-xl'>Edit Profile</h1>
      <form className='flex flex-col justify-start items-start'>
      <div id = "image-select" className='flex justify-center items-center mb-6'>
          <img src = {imageURL || ""} className='w-32 rounded-full'/>
          <label for = "avatar">Image:</label>
          <input type="file"id="avatar" name="avatar"
          accept="image/png, image/jpeg, image.jpg"
          onChange={(e)=> {
              console.log(e.target.files) 
              setImage(e.target.files)
              setImageURL(URL.createObjectURL(e.target.files[0]))
          }} 
          className='space-x-4'  
          />
      </div>
      <div id = "First_Name" className='flex gap-2 justify-center items-center mb-6'>
          <label for = "firstName" className='block mb-2 text-sm font-medium'> Name : </label> 
            <input
             type = "text"
             placeholder='first name'
             value = {firstName}
             onChange={(e)=>setFirstName(e.target.value)}
             className='rounded-md p-2'
            />
             <input
             type = "text"
             placeholder='lastName'
             value = {lastName}
             className='rounded-md p-2'
             onChange={(e)=>setLastName(e.target.value)}
            />    
      </div>
      <div className='about mb-6'>
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
       <div id = "caption mb-6">
          <label for = "select" className='mb-2 p-6 text-sm font-medium'>Caption</label>
           
          <select onChange={(e)=> setCaption(e.target.value)}>
            <option>PLEASE CHOSE</option>
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
          
       <div className='mt-6'>
         <button
          className='text-white bg-secondary hover:text-dark  hover:bg-white border hover:border-dark focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
         onClick={handleSubmit}>Update</button>
         <button
         className=' ml-5 text-white bg-secondary hover:text-dark  hover:bg-white border hover:border-dark focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
         onClick={clearData}
         >Cancel</button>
       </div>
      <div>

      </div>
       </form>       
    </section>
  )
}

export default ProfileEdit
