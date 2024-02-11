import {Slide, toast} from "react-toastify";
import {toastOptions} from "./toastOptions";

export const successToast=(message)=>{
  toast.success(message, toastOptions);
}