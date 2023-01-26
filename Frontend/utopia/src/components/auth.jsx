import { useState } from 'react'

const Auth = () => {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checked, setChecked] = useState(false)

    return (
        <section className='overscroll-none p-10'>
            <div className='max-w-[80vw] flex items-center p-4 justify-between mx-auto my-0 border-dark border-solid border-2 rounded-md h-[90vh] m-x-0 m-y-auto bg-white'>
                {/*first section*/}
                <div className='first-section  justify-around flex-col item-center bg-primary w-[40%] h-[85vh] p-4 rounded-md hidden md:flex'>
                    <div className='flex items-center justify-left '>
                        <img src="/utopia.png" className="w-10" alt="logo"></img>
                        <h1 className='text-[12px] text-white font-semibold overflow-hidden'>UTOPIA</h1>
                    </div>
                    <div className='px-5'>
                        <h1 className='font-sans text-white font-bold md:text-[24px] lg:text-[24px] xl:text-[32px]'>
                            Start your journey with new community
                        </h1>
                    </div>
                    <div className='px-5 mt-8'>
                        <p
                            className='text-white font-light font-serif xl:text-[32px] lg:text-[18px] md:text-[18px] text-left lg:mr-8 md:mr-3'
                        >
                            Listen to podcast with live video and chat.Meey and Join Amazing Community.
                        </p>
                    </div>
                    <div className='ml-5 mt-8 rounded-md bg-secondary'>
                        <p className='text-white font-sans md:text-[12px] lg:text-[18px] xl:text-[24px] p-4'>
                            I hope everyone enjoys the time here and in best collabrate with each us
                        </p>
                        <div className='flex items-center justify-left gap-4 p-4'>
                            <img src="/myAvatar.png" className="w-[5vw] rounded-full" alt="pic" />
                            <div>
                                <p className='text-[14px] italic text-light text-white'>Khushi Shukla</p>
                                <p className='text-[14px] italic text-light text-white'>Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*second section*/}
                <div className='w-[60%] pl-4 m-[20%] md:m-0'>
                    <h1 className='text-[24px] font-bold font-sans text-center'>SignUp</h1>
                    <h4 className='text-[16px] font-light mb-2 font-sarif text-center'>Already have a account?</h4>
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
                </div>
            </div>
        </section>
    )
}

export default Auth
