# lens-apps

2 solutions: fork the lens protocol and deploy yourself the contracts or
use the [deployed contracts](https://docs.lens.xyz/docs/deployed-contract-addresses).

2 ways to interact with the protocol:

1. send transactions directly on the smart contracts deployed on Polygon
2. use the graphql api to send requests and mutations

Obtaining a whitelisted address lets you send gasless transactions and allows
you to implement some extra features such as authentication.

## 1. lens-app-1-testnet-nextjs

First iteration with the lens protocol on a nextjs app. Interaction with
the contracts on the Mumbai testnet, with the mocked whitelisted address
for Profile creations.
