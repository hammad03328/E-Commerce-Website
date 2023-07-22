import Spacer from '@/Components/Spacer'
import React from 'react'
import Image from 'next/image'

const Promo_sec = () => {
  return (
    <Spacer>
    <div className='h-auto mt-16'>
        <div className='flex justify-center text-[#0062f5] text-xl font-semibold'>Promotion</div>
        <div className="text-4xl text-black flex justify-center font-bold ">Our Promotions Event</div>
        <div className="flex flex-row gap-x-4 mt-4">
            <div className="w-5/12 h-auto space-y-3">
                <div className="flex h-32 bg-gray-300  justify-between">
                    <div className="flex flex-col justify-center place-items-center mx-auto ml-4"><div><h3 className='font-bold text-lg'>GET UP TO 60%</h3><h4 className='text-xs'>For the summer season</h4></div></div>
                   <div className="flex place-items-end"> <Image className='aflex ' src="/Hsec/event1.webp" alt="" width={150} height={150}/></div>  
                </div>
                <div className="h-32 bg-[#212121] flex flex-col justify-center place-items-center">
                    <div className='text-white'>
                        <div className="">
                            <div className=' text-xl font-bold text-center'>GET 30% Off</div>
                            <div className='mt-2 text-xs text-center'>Use Promo Code</div>
                            <div className='mt-1 text-center text-sm bg-[#474747] rounded-md px-10 tracking-widest'>DINEWEEKENDSALE</div>
                        </div>
                        <div className="div"></div>
                    </div>
                </div>
            </div>
            <div className="w-2/6 h-1auto bg-[#efe1c7]"></div>
            <div className="w-2/6 h-auto bg-gray-300"></div>
        </div>
    </div>
    </Spacer>
  )
}

export default Promo_sec