import Spacer from '@/Components/Spacer'
import Link from 'next/link'
import React from 'react'
// import Cout_Button from '@/Components/Cout_Button'

const page = () => {
  return (
    <div>
      <div >
        <Spacer>
          <Spacer>
          <div className='relativea flex flex-col justify-center items-center min-h-screena my-20'>
            <div className='absolute -mt-2 -z-10 text-9xl font-bold text-[#e5e7eb]'>Thankyou!!</div>
            <div className='text-xl text-center '>
              Thank you for choosing our store! Your purchase means a lot to us. We appreciate your support and look forward to serving you again.
            </div>
            <div className='text-white font-semibold text-lg text-center mt-4'>
              <Link className='px-3 py-2 bg-black' href="/AllProd">
                Continue Shopping
              </Link>
            </div>
          </div>
          </Spacer>
        </Spacer>
      </div>
    </div>
    
  )
}

export default page