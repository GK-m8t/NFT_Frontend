import axios from "axios";

export const getTokenMetadata = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    console.log('Failed to fetch token metadata');
    console.log(e);
  }
}
