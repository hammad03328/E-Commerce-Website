"use client"

import React, { useEffect, useReducer, useState } from 'react';
import { NextPage } from 'next';
import Spacer from '@/Components/Spacer';
import { Prod_sec } from '@/lib/san';
import { Image as Iimage } from "sanity";
import { urlForImage } from '../../../../sanity/lib/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BlockContent from '@sanity/block-content-to-react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface Category {
  _id: string;
  _type: "Category";
  Category: string;
}
interface Prod_for {
  _id: string;
  _type: "Category";
  Prod_for: string;
}

interface Iprod {
  Name: string;
  price: number;
  _id: string;
  image: Iimage;
  Category?: Category;
  Prod_for:Prod_for;
  care: Block[];
  content: Block[];
}


interface Block {
  _type: 'block';
  _key: string;
  style?: string;
  markDefs?: any[];
  children: BlockSpan[];
}

interface BlockSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: any[];
}

const Page : NextPage<{params:{slug:string}}>  = ({params}) => {
  const {refresh} = useRouter();
  const [val, setval] = useState(false);// this is for product add error 
  const bval=decodeURI(params.slug);

  const [data, setData] = useState<Iprod[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Prod_sec(bval);
        // console.log("value main page me", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const initialState = {
    cart: [
      { id: 1, name: 'Shirt' },
      { id: 2, size: "" },
      { id: 3, quantity: 0 },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state:any, action:any) {
    if (action.type === 'update_product') {
      const { id, newName } = action.payload;
      const updatedCart = state.cart.map((product:any) =>
        product.id === id ? { ...product, name: newName } : product
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    if (action.type === 'update_size') {
      const { id, newName } = action.payload;
      const updatedCart = state.cart.map((product:any) =>
        product.id === id ? { ...product, size: newName } : product
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    if (action.type === 'increase_quantity') {
      const { id } = action.payload;
      const updatedCart = state.cart.map((product:any) =>
        product.id === id ? { ...product, quantity: product.quantity + 1} : product
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    if (action.type === 'zero_quantity') {
      const { id } = action.payload;
      const updatedCart = state.cart.map((product:any) =>
        product.id === id ? { ...product, quantity: product.quantity =0} : product
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    if (action.type === 'decrease_quantity') {
      const { id} = action.payload;
      const updatedCart = state.cart.map((product:any) =>
        product.id === id && product.quantity > 0 ? { ...product, quantity: product.quantity -1} : product
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    throw new Error('Unknown action.');
  }

  const handleChangeProductName = (productId:number, newName:string) => {
    dispatch({ type: 'update_size', payload: { id: productId, newName } });
  };
  const handleChangeProductQuan = (productId:number, newName:string) => {
    dispatch({ type: newName, payload: { id: productId} });
  };


  return (

<Spacer>
<div className="bg-blue-50 text-black p-4 mt-4">
{data.map((item:Iprod) => {

  const handleAddCart=async(val: string)=>{

    if((state.cart[2].quantity != 0) && (state.cart[1].size != ""))
    { setval(false);
      const res=await fetch("/api/cart",{
      method:"POST",
      body:JSON.stringify(
        {
          Product_id:val,
          Quantity:state.cart[2].quantity,
          size:state.cart[1].size,
          price:item.price
      }
      )
    })
    if(!res.ok) {console.log("not added")}
    
    else{
      // <Noti text="v v" error_type="dcdc" /> 
      toast.success("Added to cart");
    console.log("added succesful")
    handleChangeProductName(2, '')
    handleChangeProductQuan(3, 'zero_quantity')
    
  refresh()}
  }
    else{console.log("Select size or Quantity")
    toast.warning("Select size or Quantity")
  setval(true)}
  }


  const t_price = (item.price * state.cart[2].quantity).toFixed(2)

  return(
  <div key={item._id}>
<ToastContainer position="bottom-left" newestOnTop />
    

    <div className="flex gap-x-10 ">
      <div className="basis-1/12 "><Image src={urlForImage(item.image).url()} alt="Image" width={200} height={200}/></div>
      <div className="basis-7/12 "><Image src={urlForImage(item.image).url()} alt="Image" width={700} height={700}/></div>
      <div className="basis-4/12 text-black">
        <div className="text-black text-2xl font-bold">{item.Name}</div>
        <div className=" text-gray-500 font-semibold">{item.Category?.Category}</div>
        <div className=" text-gray-500 font-semibold text-sm">${item.price}</div>
        <div className="div">
          <div className="mt-8 text-xs font-bold">SELECT SIZE</div>
          <div className="space-x-2 mt-2 text-gray-500 text-sm font-semibold">
            <button className='w-8 h-8 rounded-full hover:bg-white text-center shadow-black hover:shadow-mda hover:drop-shadow-md'onClick={() => handleChangeProductName(2, 'Extra Small')}>XS</button>
            <button className='w-8 h-8 rounded-full hover:bg-white text-center shadow-black hover:shadow-mda hover:drop-shadow-md'onClick={() => handleChangeProductName(2, 'Small')}>S</button>
            <button className='w-8 h-8 rounded-full hover:bg-white text-center shadow-black hover:shadow-mda hover:drop-shadow-md'onClick={() => handleChangeProductName(2, 'Medium')}>M</button>
            <button className='w-8 h-8 rounded-full hover:bg-white text-center shadow-black hover:shadow-mda hover:drop-shadow-md'onClick={() => handleChangeProductName(2, 'Large')}>LG</button>
            <button className='w-8 h-8 rounded-full hover:bg-white text-center shadow-black hover:shadow-mda hover:drop-shadow-md'onClick={() => handleChangeProductName(2, 'Extra Large')}>XL</button>
          </div>

          <div className="flex space-x-2 mt-6 mb-10">
            <div className="font-semibold">Quantity :</div>
            <div className="flex space-x-2"><button onClick={() => handleChangeProductQuan(3, 'decrease_quantity')} className='flex items-center justify-center w-4 h-4 rounded-full bg-white ring-2 ring-black text-center m-auto'> - </button><p className='font-semibold w-4 text-center'>{state.cart[2].quantity}</p><button className='flex items-center justify-center w-4 h-4 rounded-full bg-white ring-2 ring-black text-center m-auto' onClick={() => handleChangeProductQuan(3, 'increase_quantity')}>+</button></div>
          </div>
{/* (state.cart[2].quantity > 0)  && (state.cart[1].size === "")*/}
{ (state.cart[2].quantity == 0) && (state.cart[1].size === "") ? (
  <div className="div">
  <div className={`text-black1 ${val ? "text-red-500 font-semibold":"text-black" }`}>Select Size and Quantity</div>
  
  </div>
):
(
  <div className="div">
    {/* <div className="div">Name :</div> */}
    <div className="div">Size : {state.cart[1].size}</div>
    <div className="div">Quantity : {state.cart[2].quantity}</div>
  </div>
)
}

          <div className="flex space-x-2 mt-4"><button onClick={() => handleAddCart(item._id)} className='active:scale-110 duration-300 bg-gray-800 py-1 px-2 text-white flex items-center space-x-2'><AiOutlineShoppingCart/>  <div className="text-xs font-semibold">Add to Cart</div></button><p className='text-xl font-bold tracking-wider'>${t_price}</p></div>

        </div>
      </div>
    </div>

    <div className="my-6 bg-white px-10 rounded-md">

      <div className=" py-12 m">
        <div className="font-bold text-lg z-10 relative">Product Information</div>
        <div className="absolute -mt-[3.8rem]  text-7xl font-bold tracking-wider text-gray-100 -z-">Overview</div>
      </div>
      <div className="h-[1px] w-full bg-gray-600"></div>
      <div className="flex gap-x-6 mt-4">
        <div className="basis-4/12 font-semibold text-gray-600 text-sm">PRODUCT DETAILS</div>
        <div className="basis-8/12 text-justify text-sm"><BlockContent blocks={item.content} /></div>
      </div>
      <div className="flex gap-x-6 mt-4 pb-4">
        <div className="basis-4/12 font-semibold text-sm text-gray-600">PRODUCT CARE</div>
        <div className="basis-8/12 text-justify text-sm"><BlockContent blocks={item.care}/></div>
      </div>
    </div>
    </div>)
})}
</div>
</Spacer>
  );
};

export default Page;
