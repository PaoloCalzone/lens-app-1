import { createClient } from "urql";

const API_URL = "https://api-mumbai.lens.dev";
export const client = createClient({
  url: API_URL,
});
export const GET_PROFILE = `
query($request: SingleProfileQueryRequest!) {
  profile(request: $request) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
          type
        }
        ... on RevertFollowModuleSettings {
          type
        }
      }
  }
}
`;

export const RECOMMENDED_PROFILES = `
    query {
        recommendedProfiles {
            id
            name
            bio
            attributes {
                displayType
                traitType
                key
                value
            }
            metadata
            isDefault
            picture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                url
                width
                height
                mimeType
                }
                small {
                url
                width
                height
                mimeType
                }
                medium {
                url
                width
                height
                mimeType
                }
            }
            __typename
            }
            handle
            coverPicture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                url
                width
                height
                mimeType
                }
                small {
                height
                width
                url
                mimeType
                }
                medium {
                url
                width
                height
                mimeType
                }
            }
            __typename
            }
            ownedBy
            dispatcher {
            address
            canUseRelay
            }
            stats {
            totalFollowers
            totalFollowing
            totalPosts
            totalComments
            totalMirrors
            totalPublications
            totalCollects
            }
            followModule {
            ... on FeeFollowModuleSettings {
                type
                amount {
                asset {
                    symbol
                    name
                    decimals
                    address
                }
                value
                }
                recipient
            }
            ... on ProfileFollowModuleSettings {
            type
            }
            ... on RevertFollowModuleSettings {
            type
            }
        }
        }
    }
`;
