'use client'
import React from 'react'
import { NextPage } from 'next';
import { useState, useEffect } from "react";
import { client } from '../../../sanity/lib/client';
import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image'; 
import { Image as Iimage } from "sanity";
import Spacer from "@/Components/Spacer";
import Link from 'next/link';

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
}

const page : NextPage<{params:{slug:string}}> = ({params}) => {
  const [value, setvalue] = useState<Iprod[] | null>(null);
  const val= params.slug
  const object = { title: val };
  let render="";

  useEffect(() => {
    const getData = async () => {
      
      try {
        const dumy=params.slug;
        // const res = await client.fetch(`*[_type=='Product' && Prod_for->Prod_for==object.title ]`); // && Category->Category=="Pant" || Prod_for->Prod_for==${params.slug}
       if(dumy == "Female" || dumy == "Male" || dumy == "Kids" )
        { 
          const res = await client.fetch(
          `*[_type=='Product' && Prod_for->Prod_for == $title 
          || Category->Category==$title 
          || Name==$title]
          {
            Name,
              price,
              image,
              Category->{Category},
            Prod_for->{Prod_for}
          }`, 
        { title: object.title ,
          cache: 'force-cache'});
        setvalue(res);}

       else if(dumy == "AllProd")
        {
          const res = await client.fetch(
          `*[_type=='Product']
          {
            Name,
              price,
              image,
              Category->{Category},
            Prod_for->{Prod_for}
          }`, 
        { title: object.title,
          cache: 'force-cache' });
        setvalue(res);}

        else{
          
          throw new Error("Wrong Keywords");
          render="Wrong Keyword"
          
        }

      } catch (error) {
        console.log((error as { message: string }).message);
        // console.error("Error fetching data:");
        // render="Error fetching data";
        
      }
      
    };
    getData();
  }, [object.title]);
  

  return (
    
    <Spacer>
      
      <div className="flex justify-items-center">
    <div className=" text-black grid md:grid-cols-4 sm:grid-cols-2 md:gap-6 sm:gap-y-6 justify-between mt-10 mb-12">
      {value?.map((item : Iprod)=>{
        return(
          <div className="active:scale-110 duration-300" key={item._id}>
            <Link href={`/prod/${item.Name}`}>
            <Image src={urlForImage(item.image).url()} alt="Image" width={230} height={200}/>
            <div className="text-sm font-bold my-2">{item.Name}</div>
            <div className="text-gray-600 font-semibold">{item.Category?.Category}</div>
            <div className="font-semibold my-2">${item.price}</div>
            </Link>
          </div>
          
          )
  
})}
    
    
    </div>
    </div>
    </Spacer>
  )
}

export default page