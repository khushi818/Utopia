import { useState } from 'react';
import Auth from '../components/Auth';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const { loginUser } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit")
        loginUser(email, password)
    }

    return (
        <>
            <Auth>
                <h1 className='text-[24px] font-bold font-sans text-center'>Login</h1>
                <h4 className='text-[16px] font-light mb-2 font-sarif text-center'>
                    Don't have a account?
                    <span className='text-secondary text-sm pl-2'><Link to="/signup">SignUp</Link></span>
                </h4>
                <form className='flex flex-col justify-left items-center'>

                    <div className='md:w-[70%] w-[100%]'>
                        {/* <div className="mb-6"> */}
                        {/* username */}
                        {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900">UserName</label>
                            <input type="text" id="username" name="username"
                                className="border text-sm rounded-lg  block w-full p-2.5"
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                                value={username}
                                placeholder="mary_go_around"
                                required /> */}
                        {/* </div> */}
                        {/* email */}
                        <div className="mb-6">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                            <input type="email" id="email"
                                className="border text-sm rounded-lg  block w-full p-2.5"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                value={email}
                                placeholder="mary.albert@company.com"
                                required />
                        </div>
                        {/* password */}
                        <div className="mb-6">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" id="password" name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                placeholder="•••••••••" required />
                        </div>
                        {/* button */}
                        <button type="submit" onClick={handleSubmit} className="text-white bg-secondary hover:text-dark  hover:bg-white border hover:border-dark focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Create Account</button>
                    </div>
                </form>
            </Auth>
        </>
    )
}

export default Login
