import { createClient } from "urql";

const API_URL = "https://api-mumbai.lens.dev";
export const urqlClient = createClient({
  url: API_URL,
});

export {
  GET_PUBLICATIONS,
  GET_PROFILE,
  RECOMMENDED_PROFILES,
} from "./requests";
export { CREATE_PROFILE } from "./mutations";
export { login } from "./login-user";
