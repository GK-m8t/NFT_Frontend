import {toast} from "react-toastify";
import {toastOptions} from "./toastOptions";

export const infoToast=(message)=>{
  toast.info(message, toastOptions);
}