"use client"
import Hsec from "@/Section/Hsec";
import Hsec1 from "@/Section/Hsec1";
// import { UserButton } from "@clerk/nextjs";
// import { SignIn } from "@clerk/nextjs";
// import Prod_sec from "@/Section/Prod_sec";
import Promo_sec from "@/Section/Promo_sec";
// import { ClerkProvider, useAuth } from '@clerk/nextjs'

export default function Home() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    
    <main className="">

 {/* { if ({!isLoaded} || {!userId}) {
   return(<div className="div">Not found</div>) 
  }
  return( <div className="bg-red-200">Hello, {userId}</div>;)} */}


{/* { (!isLoaded) || (!userId) ? (
  <div className="div">Not found</div>
):
(
  <div className="bg-red-200">Hello, {userId}</div>
)
}
 */}


    <Hsec />
    <Promo_sec/>
    <Hsec1/>
    <div className="h-8"></div>
  </main>
  );
}
