import Spacer from '@/Components/Spacer'
import Image from 'next/image'
import{AiOutlineShoppingCart} from 'react-icons/ai';

function Hsec() {
  return (
    <Spacer>
    <div className="flex flex-row mt-12 gap-x-12a scale-90">
      <div className="w-1/2 space-y-7 mr-12 -mt-4 bg-red-200a scale-95">
        <div className="inline-block py-1 px-4 rounded-md h-auto bg-[#e1edff] mt-4"><p className='text-[#0000ff] text-base font-semibold'>Sale 70%</p></div>
        <div className="mr-20 space-y-8 bg-red-200a">
          <p className='text-black  text-5xl font-bold'>An Industrial Take on Streetwear</p>
          <p className='text-base'>Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
        </div>
        <button className='flex place-items-center space-x-4 border py-1 px-3 text-white bg-gray-950'><div className='scale-125'><AiOutlineShoppingCart/></div><div><p>Start<br/> Shoping</p></div></button>
        <div className="flex gap-4">
          <Image className='' src="/Logo/F1.webp" alt="F1" width={130} height={150}/>
          <Image className='' src="/Logo/F2.webp" alt="F2" width={130} height={150}/>
          <Image className='' src="/Logo/F3.webp" alt="F3" width={130} height={150}/>
          <Image className='' src="/Logo/F4.webp" alt="F4" width={130} height={150}/>
        </div>
      
      </div>
      
       <div className=" w-1/2 bg-greena-200">
        <div className="max-w-md min-w-[30rem] relative w-[30rem] h-[30rem] flex plae-items-center rounded-full bg-[#ffece3]"><Image className='absolute -mt-10 w-[34rem] h-[34rem] object-cover' src="/Hsec/hgirl.webp" alt="girl" width={1500} height={1500}/></div>
       </div>
    </div>
    
    </Spacer>
  )
}

export default Hsec