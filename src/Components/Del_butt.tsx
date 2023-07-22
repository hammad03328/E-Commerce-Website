"use client"
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

// const Del_butt: FC<{ item: number }> = ({ item }) => {
const Del_butt: FC<{ id: number, quan:number}> = ({ id,quan }) => {

     const{refresh} =useRouter()
  // refresh();
  const handleDeleteCart = async (id: number) => {
    const res = await fetch(`/api/cart?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.log("Not Delete");
      toast.error("Not Delete");
    } else {
      // <Noti text="v v" error_type="dcdc" />
      toast.success("Delete Succesfully");
      console.log("Deleted succesful");

      refresh()
    }
  };

  const handleupdate=async(id: number,quan:number,nature:string)=>{
      if (nature=="add"){quan=quan+1;}
    if (nature=="sub"){quan=quan-1;}
    if(quan>=1)
    { 
      const res=await fetch(`/api/cart/?id=${id}`,{
      method:"PATCH",
      body:JSON.stringify(
        {
          Quantity:quan,
        }
      )
    })
    if(!res.ok) {console.log("not added")}
    
    else{
      // <Noti text="v v" error_type="dcdc" /> 
      toast.success("Quantity Updated");
    console.log("Quantity Updated")
  refresh()}
}
else{
  // handleDeleteCart(id)
  toast.error("Minimum quantity is 1")
}
  }


  return (
    
    <div>
        
      <button onClick={() => handleDeleteCart(id)}>
        <RiDeleteBin6Line className="active:scale-110 text-2xl"/>
      </button>

      <div className="flex justify-end place-items-end align-bottom mt-20">
        <div className="flex">
          <button onClick={()=>handleupdate((id),quan,"sub")} className="flex items-center justify-center w-4 h-4 rounded-full bg-white ring-2 ring-black text-center my-auto active:scale-110">
            -
          </button> 
          <p className="font-semibold w-8 my-auto text-center">
            {quan}
          </p>
          <button onClick={()=>handleupdate((id),quan,"add")} className="flex items-center justify-center w-4 h-4 rounded-full bg-white ring-2 ring-black text-center my-auto active:scale-110">
            +
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-left" newestOnTop />

    </div>
  );
};

export default Del_butt;
