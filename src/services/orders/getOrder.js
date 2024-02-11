import axios from "axios";
import config from 'src/constants/app.config.json';



export const getOrder = async (tokenId, credential) => {

  try {
    const { data } = await axios.get(config.serverUrl + `orders/${tokenId.toString()}`, { params: credential });
    return data;
  } catch (e) {
    console.log('Failed to fetch token request');
    console.log(e);
  }
}