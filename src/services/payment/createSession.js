import axios from "axios";
import config from 'src/constants/app.config.json';
import serverCodes from 'src/constants/serverCodes.json';


export const createSession = async (tokenId, credential, method) => {
  try {
    const req={ paymentMethod: serverCodes.paymentMethod[method.toLowerCase()] };
    const { data } = await axios.post(config.serverUrl + `checkout/${tokenId}`, { paymentMethod: serverCodes.paymentMethod[method.toLowerCase()] }, { params: credential });
    console.log("checking req data",data)
    return data;

  } catch (e) {
    console.log('Failed to fetch payment link');
    console.log(e);
  }
}