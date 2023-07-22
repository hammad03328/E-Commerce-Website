import Spacer from '@/Components/Spacer'
import React from 'react'
import Image from 'next/image'
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrFacebookOption } from 'react-icons/gr';
import { FaLinkedinIn } from 'react-icons/fa';

const Desc_sec = () => {
  return (
    
        <div className='mt-8'>
            <Spacer>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                     <div className="grid grid-cols-1 gap-y-8">
                        <div><Image src="/Logo/Clogo.webp" alt="c_logo" width={130} height={20}/></div>
                        <div className="text-xs text-gray-800">Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</div>
                        <div className="flex space-x-4">
                            <div className="hover:scale-125 duration-300 w-8 h-8 bg-gray-100 rounded-md flex justify-center items-center"><AiOutlineTwitter size={15} color="" /></div>
                            <div className="hover:scale-125 duration-300 w-8 h-8 bg-gray-100 rounded-md flex justify-center items-center"><GrFacebookOption size={15} color="" /></div>
                            <div className="hover:scale-125 duration-300 w-8 h-8 bg-gray-100 rounded-md flex justify-center items-center"><FaLinkedinIn size={15} color="" /></div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="space-y-3">
                        <div className="font-bold">Company</div>
                        <div className="text-sm text-gray-800">About</div>
                        <div className="text-sm text-gray-800">Term of Use</div>
                        <div className="text-sm text-gray-800">Privacy Policy</div>
                        <div className="text-sm text-gray-800">How it Works</div>
                        <div className="text-sm text-gray-800">Contact Us</div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="space-y-4">
                        <div className="font-bold">Support</div>
                        <div className="text-sm text-gray-800">Support Career</div>
                        <div className="text-sm text-gray-800">24h Service</div>
                        <div className="text-sm text-gray-800">Quick Chat</div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="space-y-4">
                        <div className="font-bold hover:cursor-pointer">Contact</div>
                        <div className="text-sm hover:cursor-pointer text-gray-800">Whatsapp</div>
                        <div className="text-sm hover:cursor-pointer text-gray-800">24hr Support</div>
                    </div>
                </div>
            </div></Spacer>
            <div className="mt-6">
        <div className="w-full h-[1.5px] bg-gray-600"></div>
        <Spacer>
        <div className="flex justify-between text-gray-700 py-3">
            <div className="">Copyright © 2022 Dine Market</div>
            <div className="div">Design by. Hammad</div>
            <div className="div">Code by. Hammad0328 on github</div>
        </div></Spacer>
    </div>
        </div>
    
  )
}

export default Desc_sec