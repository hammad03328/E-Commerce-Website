"use client"
import React, { useReducer } from 'react';

export default function Counter() {
  const initialState = {
    cart: [
      { id: 1, name: 'cloth' },
      { id: 2, size: "sm" },
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
    <>
      <button onClick={() => handleChangeProductName(2, 'New Product 2 Name1')}>
        Update Product 2 Name
      </button>
      <br/>
      <button onClick={() => handleChangeProductQuan(3, 'increase_quantity')}>
        Increase Quantity
      </button>
      <br/>
      <button onClick={() => handleChangeProductQuan(3, 'decrease_quantity')}>
        decrease Quantity
      </button>
     <br/>
     <div className="div">buttons end</div>
     <br/>
      <ul>
        {state.cart.map((product:any) => (
          
           <li key={product.id}>
            {product.id}
            <br/>
           shirt :{product.name}-size :{product.size} - quantity :{product.quantity}
         </li>
        ))}
        <div className="div">loop end</div>
      </ul>
      {/* <div className="div">Total quantity</div>
      <div className="div">{state.cart[2].quantity}</div>*/}
      <br/>
      <div className="div">size from outside : {state.cart[1].size}</div> 
    </>
  );
}
