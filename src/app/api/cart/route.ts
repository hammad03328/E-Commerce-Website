import { NextResponse, NextRequest } from "next/server";
import { todo, db, newtodo, cartTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { cookies } from "next/dist/client/components/headers";
import { boolean } from "drizzle-orm/pg-core";


//#####################__GET__###########
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  // console.log("this is url "+url);
  try {

      const ID = url.searchParams.get("id");
      if(ID != null){
      await sql`CREATE TABLE IF NOT EXISTS todo(id serial, user_id varchar(255), product_id varchar(225), quantity varchar(255), size varchar(255), price varchar(225))`;
      const res = await db.select().from(cartTable)
      .where(eq(cartTable.user_id, ID))
      .execute();
      return NextResponse.json({ data: res });
    }
    else {
      throw new Error ("No id Found");
    }
  } catch (error) {
    console.log("error",(error as { message: string }).message);
    return NextResponse.json({ message: "something went wrong" });
  }
}



//#####################__DELETE__###########
//http://localhost:3000/api/cart/?Products=Hello1
export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  try {
    if (url.searchParams.has("id")) {
      const ID = url.searchParams.get("id") as string;

      // if (ID != null) {
        const res = await db
          .delete(cartTable)
          .where(eq(cartTable.id, parseInt(ID)))
          .returning();
        // console.log(res);
      // }
      return NextResponse.json({message:"Deleted Succesfully",data:res});
    } else {
      throw new Error("Data Not Found");
    }
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}

//#####################__PATCH__###########
export async function PATCH(request: NextRequest) {
  const url = request.nextUrl;
  try {
    const req = await request.json();
    if (url.searchParams.has("id")) {
      const ID = url.searchParams.get("id") as string;
        const result =await db.update(cartTable).set({quantity:req.Quantity}).where(eq(cartTable.id,parseInt(ID))).returning()
        return NextResponse.json({message:"Update Succesfully",data:result}); 
    } 

  } 
  catch (error) 
  {
    console.log((error as { message: string }).message);
    return NextResponse.json({message: (error as { message: string }).message});
  }
}


export async function POST(request: NextRequest) {
  const uid = uuid();
  const set_cookies = cookies();
  const user_id = cookies().get("user_id");
  const dum = cookies().get("user_id")?.value;
  console.log("dum",dum);
  if (!user_id) {
    set_cookies.set("user_id", uid);
  }

  await sql`CREATE TABLE IF NOT EXISTS todo(id serial, user_id varchar(255), price varchar(225), quantity varchar(255), size varchar(255), product_id varchar(225))`;
  const req = await request.json();
  console.log("req",req)
 
 
  try {
    if (req.Product_id && req.Quantity && dum && req.size) {
      const data = await db.select().from(cartTable)
      .where(eq(cartTable.user_id, dum))
      .execute();
      const dummy=data.find((item)=>item.product_id==req.Product_id && item.size==req.size)
      // console.log("dummy",dummy)
      
      if(dummy)
      {
        // console.log("1st cond")
        const sum_quan=dummy.quantity+req.Quantity
        const result =await db.update(cartTable).set({quantity:sum_quan}).where(eq(cartTable.product_id,req.Product_id))
        console.log("Update succesfull")
        return NextResponse.json({message:"Update Succesfully",data:result});
      }
      else
      {
        // console.log("2nd cond")
        const res = await db
        .insert(cartTable)
        .values({
          product_id: req.Product_id,
          quantity: req.Quantity,
          user_id: dum as string,
          size: req.size,
          price:req.price
        })
        .returning();
        console.log("Added succesfull")
      return NextResponse.json({ message: "added succesfully" });}
    }
     else 
     throw new Error("Task field required");
  } 
  catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}




//#####################__POST__###########
// export async function POS(request: NextRequest) {
//   const uid = uuid();
//   const set_cookies = cookies();
//   const user_id = cookies().get("user_id");
//   const dum = cookies().get("user_id")?.value;
//   console.log("dum",dum);
//   if (!user_id) {
//     set_cookies.set("user_id", uid);
//   }

//   await sql`CREATE TABLE IF NOT EXISTS todo(id serial, user_id varchar(255), price varchar(225), quantity varchar(255), size varchar(255), product_id varchar(225))`;
//   const req = await request.json();
 
 
//   try {
//     if (req.Product_id && req.Quantity && dum && req.size) {
//       const res = await db
//         .insert(cartTable)
//         .values({
//           product_id: req.Product_id,
//           quantity: req.Quantity,
//           user_id: dum as string,
//           size: req.size,
//           price:req.price
//         })
//         .returning();
//       return NextResponse.json({ message: "added succesfully" });
//     } else throw new Error("Task field required");
//   } catch (error) {
//     console.log((error as { message: string }).message);
//     return NextResponse.json({
//       message: (error as { message: string }).message,
//     });
//   }
// }