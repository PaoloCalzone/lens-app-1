import { urqlClient } from ".";

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export async function generateChallenge(address) {
  const client = await urqlClient();

  return client
    .query(GET_CHALLENGE, { request: { address: address } })
    .toPromise();
}
