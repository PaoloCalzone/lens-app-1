# 2. lens-app-2-mint-profile

Second iteration with the lens protocol on a nextjs app.

## 1. let the user connect his wallet:

- check if there is an ethereum provider (`window.ethereum`)
- detect which ethereum network the user is connected to
- get the user's Ethereum account(s)

**Ether.js** library allows you to use 3 classes (front-end, back-end, command-line):

1. `Provider`: establish a connection to the ethereum blockchain (read-only)
2. `Signer`: has access to the private key for signing transaction and sending messages.
3. `Contract`: create an object that gives you access to a contract and its methods.

**Metamask** is a browser wallet that has:

1. a `Provider` for connecting to a blockachain
2. a `Signer` that holds private keys and sign things.

```js
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum);

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner();
```

### Docs:

- [ethers Provider API](https://docs.ethers.io/v5/getting-started/)
- [metamask ethereum provider API](https://docs.metamask.io/guide/ethereum-provider.html)
- [Metamasl onboarding library](https://docs.metamask.io/guide/onboarding-library.html#getting-started) for a first smooth UX.

### User's account interactions best practices

- Don't let the user click on the connect button before the page is fully loaded
- Force [page refreshes on network changes](https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)

## 2. let the user authenticate (login)

In order to create a profile...
The HTTP Authorization request header can be used to provide credentials that authenticate a user agent with a server, allowing access to a protected resource, in this case, an access token to mint a new Profile.

```js
const client = createClient({
  url: "https://api-mumbai.lens.dev",
  // add token to header if present
  fetchOptions: () => {
    const token = getToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
});
```

1. generate a challenge from the server (= request)
2. sign that challenge with your Ethereum wallet and send the signature to lens server to generate a valid JWT `accessToken`, and `refreshToken` (= mutation)

## 3. let the user mint his profile on testnet with the graphql api

```graphql
mutation CreateProfile {
  createProfile(
    request: {
      handle: "devjoshstevens"
      profilePictureUri: null
      followNFTURI: null
      followModule: null
    }
  ) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
```
