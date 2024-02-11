import {
  getUserTokenIds,
  getTokenMetadata,
  getOrder,
} from "src/services";


export const fetchUserTokens = async (address, signedMessage, unsignedMessage) => {
  try {
    const userTokenData = [];
    const userTokenIds = await getUserTokenIds(address);
    
    if (userTokenIds.length > 0) {
      //const baseURI = await getBaseURI();
      const baseURI = "https://melektaus.metadata.3dhoudini.tech/metadata/";
      const credential = {
        signer: JSON.stringify({ address }),
        certificate: JSON.stringify(unsignedMessage),
        signature: signedMessage,
      }

      for (let i = 0; i < userTokenIds.length; i++) {
        const tokenMetadata = await getTokenMetadata(
          baseURI + `${userTokenIds[i]}`
        );

        const tokenDataRes = await getOrder(userTokenIds[i], credential);
        console.log('tokenDataRes--', tokenDataRes)
        if(tokenDataRes?.code === 'OK'){
          userTokenData.push({
            ...tokenDataRes.data,
            ...tokenMetadata,
          });
        }else{
          userTokenData.push({
            ...tokenMetadata,
            message : "Request doesn't exist",
            tokenId: userTokenIds[i],
          });
        }

      }
    }
    return userTokenData;

  } catch (error) {
    console.log(error);
  }
}
