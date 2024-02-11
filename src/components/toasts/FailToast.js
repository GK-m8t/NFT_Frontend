import {Slide, toast} from "react-toastify";
import {toastOptions} from "./toastOptions";

export const failToast=(message)=>{
  toast.error(message, toastOptions);
}