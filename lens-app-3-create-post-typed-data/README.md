# Create a publication (aka a post)

## Description:

The steps to create a post on lens are the following:

1. Store the data and metadata on a decentralized file storage system, such as ipfs or arweave.
   You can verify your data is stored on ipfs in a brave browser with: `ipfs://<your CID>`
2. Retrieve the CID (content identifier) and send the transaction or the graphql mutation to Lens API.

Lens has strict rules on the data you pass on step 1. If required data is missing, lens won't index the publication. You can have an example of indexed metadata [here](https://lens.infura-ipfs.io/ipfs/bafybeih72dhiokkc3kbpcdrrstyinbt4uaiurvge3cf5l2r3r4grnkoas4/metadata.json). Be aware that these requirement can evolve and check the [lens doc](https://docs.lens.xyz/docs/metadata-standards).

## Try it:

1. fork the repository

2. in your terminal:

```
git clone <my-forked-repository>
cd my-forked-repository
npm install
npm run dev
```
