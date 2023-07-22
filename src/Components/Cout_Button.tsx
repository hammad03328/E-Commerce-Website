"use client"
import React, { FC } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import getStripePromise from '@/lib/stripe';


    // const key=process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string; 
    // const stripePromise=loadStripe(key)

const Cout_Button: FC<{ id: string}> = ({ id }) =>{

    const handlecheckout=async(id:string)=>{
        const stripe=await getStripePromise();

        const urlm = process.env.NEXT_PUBLIC_LINK_STRIPE as string;
        const iid = encodeURIComponent(id);
        const url = urlm.concat(iid);



        const ID=encodeURIComponent(id)
        // const res=await fetch(`/api/stripe-session/?id=${ID}`,{
        const res=await fetch(url,{
            method:"POST",
            cache:"no-cache"
        })
        const data=await res.json();
        if(data.session)
        {
            console.log("done", )
            stripe?.redirectToCheckout({sessionId:data.session.id})
        }
    }

    return (
        <div>
            <button onClick={()=>handlecheckout(id)} className=" bg-black text-white px-2 py-1 active:scale-110">Process to Checkout</button>
        </div>
    )
}

export default Cout_Button