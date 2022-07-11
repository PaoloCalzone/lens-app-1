import { urqlClient } from ".";

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address) => {
  const client = urqlClient;
  return client.query(GET_CHALLENGE, { request: { address: address } });
};
