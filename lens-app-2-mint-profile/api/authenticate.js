import { urqlClient } from ".";

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticate = (address, signature) => {
  const client = urqlClient;
  return client.mutation(AUTHENTICATION, { request: { address, signature } });
};
