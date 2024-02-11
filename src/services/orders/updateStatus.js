import axios from "axios";
import config from 'src/constants/app.config.json';


export const updateStatus = async (tokenId, bodyParams, credential) => {
  try {
    
    const { data } = await axios.put(config.serverUrl + `orders/status/${tokenId}`, bodyParams,{params:credential});
    return data;

  } catch (e) {
    console.log('Failed to update request');
    console.log(e);
  }
}