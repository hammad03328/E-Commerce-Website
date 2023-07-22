// "use client";
import Spacer from "@/Components/Spacer";
import Image from "next/image";
import { Image as Iimage } from "sanity";
import { todo } from "@/lib/drizzle";
import { cookies } from "next/dist/client/components/headers";
// import { cookies } from "next/headers";
import { Prod_sec } from "@/lib/san";
import { urlForImage } from "../../../sanity/lib/image";
import { ToastContainer, toast } from "react-toastify";
import Del_butt from "@/Components/Del_butt";
import Cout_Button from "@/Components/Cout_Button";
// import { useRouter } from "next/navigation";

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
  Prod_for: Prod_for;
  // care: Block[];
  // content: Block[];
}
// interface Block {
//   _type: 'block';
//   _key: string;
//   style?: string;
//   markDefs?: any[];
//   children: BlockSpan[];
// }

// interface BlockSpan {
//   _type: 'span';
//   _key: string;
//   text: string;
//   marks?: any[];
// }

const san_fetch = async (bval: string) => {
  try {
    const result: Iprod[] = await Prod_sec(bval);
    const data = result;
    return data;
  } catch (error) {
    console.error("Error fetching data:", (error as {message:string}).message);
  }
};

export const getdata = async (id: string) => {
  try {
    // const urlm="http://localhost:3000/api/cart/?id="
    const urlm = process.env.NEXT_PUBLIC_LINK as string;
    const iid = encodeURIComponent(id);
    const url = urlm.concat(iid);
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.log("Error Status : ", res.status);
      throw new Error("Error Status : " + res.status);
    } else {
      const val = await res.json();
      console.log("fetch complete");
      return val;
    }
  } catch (error) {
    console.log("fetching error", (error as { message: string }).message);
  }
};

const c_valu=()=>{
  const a= cookies().get("user_id")?.value as string; 
  return a}

//cookise me hi fetch function call hora api se
export const cooks = async () => {
  try {
    const getvalue = cookies().get("user_id")?.value as string;
    const data = await getdata(getvalue); // get value from api
    const value: todo[] = data.data;
    return value;
  } catch (error) {
    console.log((error as { message: string }).message); 
  }
};

const page = async () => {
  const c_value=c_valu();
  const value = await cooks(); // will get api value

  const new_array =
    value?.map(async (item: todo) => {
      const san = await san_fetch(item.product_id); //fetch with pass variable to sanity function
      const san_data = san as Iprod[];
      const iprod = san_data[0];
      return {
        todoId: item.id,
        todoquan: item.quantity,
        size:item.size,
        iprodId: iprod ? iprod._id : null,
        Name: iprod ? iprod.Name : null,
        image: iprod.image,
        _id: iprod ? iprod._id : null,
        Category: iprod ? iprod.Category : null,
        price: iprod ? iprod.price : null,
      };
    }) || [];

  const results = await Promise.all(new_array);
  // console.log(results[0])

  //for sum of total quantity
  const new_array1 =
    value?.map((item: todo) => {
      return item.quantity;
    }) || [];

  const T_quan: number = (await Promise.all(new_array1)).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const t_price =
    value?.map(async (item: todo) => {
      const multi = item.quantity * parseFloat(item.price);
      return multi;
    }) || [];

  const T_price: number = (await Promise.all(t_price)).reduce(
    (sum, price) => sum + price,
    0
  );

  // const {refresh} = useRouter();
  const handleupdate=async(id: number,quan:number,nature:string)=>{
    if (nature=="add"){quan=quan+1;}
    if (nature=="sub"){quan=quan-1;}
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
    
  // refresh()
}
  }

  return (
    <Spacer>
      <ToastContainer position="bottom-left" newestOnTop />
      <div className="div">
        <div className="text-2xl font-bold">Shoping Cart</div>
        <div className="flex text-black gap-x-8  mt-6">
          <div className="basis-8/12">
            {results.map((item) => {
              return (
                <div className="flex mt-6 gap-x-4">
                  {" "}
                  {/* here code start */}
                  <div className="basis-4/12">
                    <Image
                      src={urlForImage(item.image).url()}
                      width={200}
                      alt="image"
                      height={200}
                    />
                  </div>
                  <div className="basis-6/12  flex  items-center">
                    <div className="div space-y-2">
                      <div className="text-lg">{item.Name}</div>
                      <div className="text-gray-500">{item.Category?.Category}</div>
                      <div className="text-gray-500"> {item.size}</div>
                      <div className="font-semibold">Delivery Estimation</div>
                      <div className="text-yellow-500 font-semibold">
                        5 Working Days
                      </div>
                      <div className="font-semibold">{item.price}</div>
                    </div>
                  </div>
                  <div className="basis-2/12 flex flex-col mr-2 mt-2">
                    <div className="text-xl flex justify-end items-start ">
                      <Del_butt id={item.todoId} quan={item.todoquan} />
                    </div>
                  </div>
                </div>
              );
            })}
            {/* here code end */}
          </div>
          <div className="basis-4/12 bg-blue-50  py-6 rounded-md">
            <div className="space-y-5 ml-4">
              <div className="font-bold mx-auto">Order Summary</div>
              <div className="space-x-4  mx-auto">
                <span>Quantity</span>
                <span>{T_quan} products</span>
              </div>
              <div className="space-x-4 ">
                <span>Sub Total</span>
                <span>${T_price}</span>
              </div>
              <div className="div">
                {/* <button className=" bg-black text-white px-2 py-1">
                  Process to Checkout
                </button> */}
                <Cout_Button id={c_value}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" newestOnTop />

    </Spacer>
  ); // main return bracket
};

export default page;
