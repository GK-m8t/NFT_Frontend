import axios from "axios";
import config from 'src/constants/app.config.json';



export const getAllOrders = async (credential) => {
  try {
    const { data } = await axios.get(config.serverUrl + 'orders/', { params: credential });
    return data;
  } catch (e) {
    console.log('Failed to fetch all requests');
    console.log(e);
  }
 }
