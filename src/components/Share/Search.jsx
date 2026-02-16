
"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter();

    const handleSearch = (e) =>{
        e.preventDefault()
        if(searchTerm.trim()){

            router.push(`destinations?city=${searchTerm}`)
        }
    }
  return (
    <div>
         <div className="mt-6 bg-white rounded-2xl shadow-lg p-3">
                                <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-3">
        
                                    {/* Input */}
                                    <div className="flex items-center bg-gray-100 md:bg-transparent rounded-full px-4 py-2 flex-1">
                                        <FaSearch className="text-gray-500 mr-2" />
                                        <input
                                            type="text"
                                            placeholder="Where do you want to go?"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="flex-1 bg-transparent outline-none text-gray-700"
                                        />
                                    </div>
        
                                    {/* Button */}
                                    <button
                                        className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 
                        text-white font-semibold px-6 py-2.5 rounded-full transition duration-300"
                                    >
                                        Plan Your Adventure
                                    </button>
                                </form>
                            </div>
      
    </div>
  )
}
