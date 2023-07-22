import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const types = [ "info", "warning", "error","success"];


const convertMessageType = (messageType: string) => {
    switch (messageType) {
      case 'info':
        return 0;
      case 'warning':
        return 1;
      case 'error':
        return 2;
      case 'success':
        return 3;
      default:
        return -1; // Return -1 for unknown message types
    }
  };

export default function Noti(text:string,error_type:string) {

    // use a random type of notification
    toast(text, {
    //   type: types[Math.floor(Math.random() * types.length)] as TypeOptions
      type: types[(convertMessageType(error_type))] as TypeOptions
    });


  return (
    <div className="App">
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  );
}