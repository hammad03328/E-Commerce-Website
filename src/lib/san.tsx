
import { client } from "../../sanity/lib/client";
import { Image as Iimage } from "sanity";

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

// interface Iprod {
//   Name: string;
//   price: number;
//   _id: string;
//   image: Iimage;
//   Category?: Category;
//   Prod_for:Prod_for;
// }


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

export const Prod_sec = async (balue:string): Promise<Iprod[]> => {
  const object={title:balue};
  // *[text match "word"]
  const res: Iprod[] = await client.fetch(`*[_type=='Product' && Name==$name || _id==$name]
  {
    Name,
    _id,
      price,
      image,
      Category->{Category},
    Prod_for->{Prod_for},
    care,
    content
  }`,
  { name: object.title },{ headers: { 'Cache-Control': 'no-cache' } });
  
  // console.log("sanity library value ", res);
  return res;
};
