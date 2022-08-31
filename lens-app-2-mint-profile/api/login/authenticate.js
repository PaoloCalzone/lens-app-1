import { urqlClient } from ".";

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticate = async (address, signature) => {
  const client = await urqlClient();
  return client
    .mutation(AUTHENTICATION, { request: { address, signature } })
    .toPromise();
};
