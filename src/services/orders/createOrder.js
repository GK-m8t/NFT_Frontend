import axios from "axios";
import config from 'src/constants/app.config.json';


export const createOrder = async (tokenId, bodyParams, credential) => {
  console.log("checking create order",credential)
  try {
    const { data } = await axios.post(config.serverUrl + `orders/${tokenId}`, bodyParams,{params:credential});
    return data;
  } catch (e) {
    console.log('Failed to fetch create request');
    console.log(e);
  }
}
