import Spacer from '@/Components/Spacer'
import Image from 'next/image'
import React from 'react'
// import { ClerkProvider } from '@clerk/nextjs'

const Hsec1 = () => {
  return (
    // <ClerkProvider></ClerkProvider>
    <div className='h-screena'>
    <div className='flex justify-center'>
        <div className="h-96 relative z-0 mt-10 justify-center">
            <div className="flex justify-end font-bold text-4xl"><div className='w-2/5'>Unique and Authentic Vintage Designer Jewellery</div></div>
            <div className=' absolute bg-[#fbfcff] w-full -mt-10 -z-10 max-w-[75rem]'>
                <div className=" flex space-x-2 pt-20  px-6  mb-10">
                    <div className=" basis-2/4 h-auto relative z-0 block">
                        <div className="leading-[4rem] text-[4rem] bottom-0 -top-0 font-bold tracking-widest opacity-80 text-gray-200 absolute -z-10 max-h-xs">Different <br/><span> From </span><br/>Others</div>
                        <div className='grid grid-cols-2 gap-y-10'>
                            <div className="div">
                                <div className="font-bold ">Using Good Quality Materials</div>
                                <div className="mt-3 text-xs">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</div>
                            </div>
                            <div className="div">
                                <div className="font-bold">100% Handmade Products</div>
                                <div className="mt-3 text-xs">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</div>
                            </div>
                            <div className="div">
                                <div className="font-bold">Modern Fashion Design</div>
                                <div className="mt-3 text-xs">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</div>
                            </div>
                            <div className="div">
                                <div className="font-bold">Discount for Bulk Orders</div>
                                <div className="mt-3 text-xs">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</div>
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/4 h-auto"><Image src="/Hsec/event2.webp" alt="" width={180} height={150}/></div>
                    <div className="basis-1/4  text-xs text-justify ">
                        <div className='flex place-items-center text-xs text-justify  h-full'>
                            <div>
                            <div>This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.</div>
                            <div className="text-white"><button className=' bg-gray-950 px-2 py-1 mt-4 '>See All Product</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <div>
    <div className="space-y-4 relative z-0 mt-44 h-72">
        <div className="absolute -z-10 text-gray-200 text-8xl font-bold inset-x-0 flex justify-center">Newsletter</div>
        <div className="text-black text-2xl font-bold flex justify-center">Subscribe Our Newsletter</div>
        <div className="text-black text-xs flex justify-center">Get the latest information and promo offers directly</div>
        <div className="text-black flex justify-center gap-3"><input className='max-w-lg  border-2'></input><button className='bg-gray-950 px-3 py-1 text-white text-sm'>Get Started</button></div>
    </div>
    </div>
    
</div>

  )
}

export default Hsec1