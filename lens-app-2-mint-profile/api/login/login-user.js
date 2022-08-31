import { generateChallenge } from "./generate-challenge";
import { authenticate } from "./authenticate";
import { ethers } from "ethers";

export const login = async (address) => {
  const Provider = new ethers.providers.Web3Provider(window.ethereum);

  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);
  console.log("Challenge Response:", challengeResponse);

  // sign the text with the wallet
  const signer = Provider.getSigner();
  const signature = await signer.signMessage(
    challengeResponse.data.challenge.text
  );

  // get the access and refresh tokens
  const accessTokens = await authenticate(address, signature);
  // console.log("AccesToken", accessTokens.data.authenticate.accessToken);
  const { accessToken, refreshToken } = accessTokens.data.authenticate;
  localStorage.setItem("LensAccessToken", accessToken);
  localStorage.setItem("LensRefreshToken", refreshToken);
  const localAccessToken = localStorage.getItem("LensAccessToken");
  console.log("Local access token", localAccessToken);
  console.log("Typeof local token:", typeof localAccessToken);
};
