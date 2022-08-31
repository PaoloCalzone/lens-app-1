import { createClient } from "urql";

const API_URL = "https://api-mumbai.lens.dev";
export const simpleClient = new createClient({
  url: API_URL,
});

export async function urqlClient() {
  const localAccessToken = localStorage.getItem("LensAccessToken");
  // If there is a token in localStorage
  if (localAccessToken) {
    try {
      // refresh token with a mutation on lens API and
      // retrieve the new accessToken
      //const { accessToken } = await refreshAuthToken();
      // Pass that accessToken in the HTTP header
      const urqlClient = new createUrqlClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-access-token": `Bearer ${localAccessToken}`,
          },
        },
      });
      return urqlClient;
    } catch (err) {
      return simpleClient;
    }
  } else {
    // otherwise, the user is not logged in.
    return simpleClient;
  }
}

export {
  GET_PUBLICATIONS,
  GET_PROFILE,
  RECOMMENDED_PROFILES,
} from "./requests";
export { CREATE_PROFILE } from "./mutations";
export { login } from "./login/login-user";
