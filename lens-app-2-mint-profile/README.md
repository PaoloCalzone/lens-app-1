# 2. Create a profile

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
2. sign that challenge with your Ethereum wallet and send the signature to the lens server to generate a [valid JWT](https://jwt.io/introduction) `accessToken`, and `refreshToken` (= mutation)

### JSON Web Token structure

JSON Web Tokens consist of three parts separated by dots (.), which are:

- Header (2 parts: the type of token and the signing algorithm, eg. HS256) -> is Base64URL encoded
- Payload (contains the claims. Some items: iss(issuer), exp(expiration time),...) -> is base64URL encoded
- Signature -> `algorithm(header + payload + secret)`

Therefore, a JWT typically looks like the following.

`xxxxx.yyyyy.zzzzz`

## Store refresh token in local storage

> However, we can reduce the absolute token expiration time of tokens to reduce the security risks of storing tokens in local storage. This reduces the impact of a reflected XSS attack (but not of a persistent one). A refresh token may have a long lifespan by configuration. However, the defined long lifespan of a refresh token is cut short with refresh token rotation. The refresh is only valid within the lifespan of the access token, which would be short-lived. (in [auth0.com blog](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/))

The `accessToken` expires after 30 minutes. So the basic idea to keep
the user experience as smooth as possible without compromising security
is to refresh the token every time the user calls a query or a mutation.
You can do that by implementing a `refreshAuthToken()` function in your
`createClient()` one that gets called for every interaction with the
Lens API.

```js
export async function createClient() {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // If there is a token in localStorage
  if (storageData) {
    try {
      // refresh token with a mutation on lens API and
      // retrieve the new accessToken
      const { accessToken } = await refreshAuthToken();
      // Pass that accessToken in the HTTP header
      const urqlClient = new createUrqlClient({
        url: APIURL,
        fetchOptions: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
          },
        },
      });
      return urqlClient;
    } catch (err) {
      return basicClient;
    }
  } else {
    // otherwise, the user is not logged in.
    return basicClient;
  }
}
```

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
