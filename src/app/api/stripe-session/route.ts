import { NextRequest,NextResponse } from "next/server";
import { todo, db, newtodo, cartTable } from "@/lib/drizzle";
// import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const key=process.env.STRIPE_SECRET_KEY as string
const stripe=new Stripe(key,
    {
        apiVersion:"2022-11-15"
    })

export async function POST(request:NextRequest){
    const URL=request.nextUrl;
    const ID = URL.searchParams.get("id") as string;
    console.log("This is id : ", ID)
    if(ID){
        const data = await db.select().from(cartTable).where(eq(cartTable.user_id, ID)).execute();
        try {
            if(data)
            {
                console.log("here is data  :      ")
                // Create Checkout Sessions from body params.
                const session = await stripe.checkout.sessions.create({

                    line_items:data.map((item:todo)=>{
                        return{
                            price_data:{
                                currency:"USD",
                                product_data:{
                                    name:item.product_id
                                },
                                unit_amount : parseInt(item.price)*100,
                            },
                            quantity:item.quantity
                        }
                    }),
                submit_type:"pay",
                payment_method_types:["card"],
                // billing_address_collection:"required",
                shipping_options:[{shipping_rate:"shr_1NSmT5JUdkzM6QjsSnIFNteL"},{shipping_rate:"shr_1NSmRLJUdkzM6QjshDtHMLRI"}],
                mode: 'payment',
                phone_number_collection:{enabled:true},
                custom_fields: [
                    {
                      key: 'engraving',
                      label: {
                        type: 'custom',
                        custom: 'Shipping Address',
                      },
                      type: 'text',
                    },
                  ],
                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
              });
              return NextResponse.json({session})
            }
            else
            {
                return NextResponse.json({message:"no data found"})
            }
            
          } 
          catch (err) 
          {
            console.log("ERROR : ",(err as {message:string}).message)
            return NextResponse.json({Error:(err as {message:string}).message})
          }
    }
    else
    {
        console.log("cookies value not found")
        return NextResponse.json({message:"cookies value not found"});
    }

}