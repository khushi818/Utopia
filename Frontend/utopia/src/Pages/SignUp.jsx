import { useState } from 'react'
import Auth from '../components/Auth';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

const SignUp = () => {
    const [userName,setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checked, setChecked] = useState(false)
    const { registerUser } = useAuthContext()

    const handleSubmit = (e) =>{
        if(!password || !email || !username)
        {
            alert("please fill the details properly")
        }
        else{
             registerUser(userName,email,password) 
        }
    }

    return (
        <Auth>
            <h1 className='text-[24px] font-bold font-sans text-center'>SignUp</h1>
            <h4 className='text-[16px] font-light mb-2 font-sarif text-center'>
                Already have a account?
                <span className='text-secondary text-sm pl-2'><Link to="/login">Login</Link></span></h4>
            <form className='flex flex-col justify-left items-center'>
                
                <div className='md:w-[70%] w-[100%]'>
                    <div class="mb-6">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">UserName</label>
                        <input type="username" id="username"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            value={userName}
                            placeholder="Enter username" required />
                    </div>
                    <div class="mb-6">
                        {/* email */}
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                        <input type="email" id="email"
                            class="border text-sm rounded-lg  block w-full p-2.5"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            placeholder="mary.albert@company.com"
                            required />
                    </div>
                    {/* password */}
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" id="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            placeholder="•••••••••" required />
                    </div>
                  
                    {/* CHECKED */}
                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox"
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                onChange={(e) => {
                                    setChecked(!checked)
                                }}
                                checked={checked}
                                required />
                        </div>
                        <label for="remember" class="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                    <button type="submit"
                    onClick={handleSubmit} 
                    class="text-white bg-secondary hover:text-dark  hover:bg-white border hover:border-dark focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create Account</button>
                </div>
            </form>
        </Auth>
    )
}

export default SignUp
