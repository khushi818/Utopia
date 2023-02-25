import React from 'react'

const Activity = () => {
    return (
        <section className='hidden md:block'>
            <div className='flex  items-center justify-center flex-col '>
                <div>
                    <div className="pt-2 relative mx-auto text-gray-600">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search" />
                        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                            <img src="/search.svg" alt="search" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Activity
