import { useState } from 'react'
import Auth from '../components/Auth';
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checked, setChecked] = useState(false)
    return (
        <Auth>
            <h1 className='text-[24px] font-bold font-sans text-center'>SignUp</h1>
            <h4 className='text-[16px] font-light mb-2 font-sarif text-center'>
                Already have a account?
                <span className='text-secondary text-sm pl-2'><Link to="/login">Login</Link></span></h4>
            <form className='flex flex-col justify-left items-center'>
                <div class="grid gap-6 mb-6 grid-cols-2">
                    {/* first name */}
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                        <input type="text" id="first_name"
                            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="John"
                            value={first_name}
                            onChange={(e) => {
                                setFirstName(e.currentTarget.value)
                            }
                            }
                            required />
                    </div>
                    {/* last Name */}
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={last_name}
                            onChange={(e) => {
                                setLastName(e.currentTarget.value)
                            }
                            }
                            placeholder="Doe" required />
                    </div>
                </div>
                <div className='md:w-[70%] w-[100%]'>
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
                    {/* CONFIRM PASSWORD */}
                    <div class="mb-6">
                        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                        <input type="password" id="confirm_password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                            value={confirmPassword}
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
                    <button type="submit" class="text-white bg-secondary hover:text-dark  hover:bg-white border hover:border-dark focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create Account</button>
                </div>
            </form>
        </Auth>
    )
}

export default SignUp
