import axios from "axios";
import config from 'src/constants/app.config.json';


export const updateOrder = async (tokenId, bodyParams, credential) => {
  try {
    const { data } = await axios.put(config.serverUrl + `orders/${tokenId}`, bodyParams,{params:credential});
    return data;

  } catch (e) {
    console.log('Failed to update request');
    console.log(e);
  }
}
