import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { gql, useMutation } from "@apollo/client";
import { CREATE_POST_TYPED_DATA } from "../api";
import { apolloClient } from "../apollo-client";

export default function Post({ profile }) {
  const [post, setPost] = useState("");

  console.log("PROFILE from post", profile);

  async function createCID() {
    const body = {
      version: "2.0.0",
      metadata_id: uuidv4(),
      description: "TEXT9",
      content: "TEXT9",
      locale: "en",
      mainContentFocus: "TEXT_ONLY",
      external_url: null,
      name: "Name8",
      attributes: [],
      image: null,
      imageMimeType: null,
      media: [
        // {
        //   item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
        //   // item: 'https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png',
        //   type: 'image/jpeg',
        // },
      ],
      appId: "lens-private-comment",
    };
    try {
      const response = await fetch("/api/store-data", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        alert("Ooops! Something went wrong. Please refresh and try again.");
      } else {
        let responseJSON = await response.json();
        const contentURI = `https://infura-ipfs.io/ipfs/${responseJSON.cid}`;
        return contentURI;
      }
    } catch (err) {
      console.log("Error while uploading to ipfs", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await createCID();
    console.log("Create CID", response);
    if (!profile) {
      console.log("No profile detected...");
    }
  }

  return (
    <div>
      {profile ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="event-name"
                  name="event-name"
                  type="text"
                  className="block max-w-lg w-full shadow-sm focus:ring-emerald-700 focus:border-emerald-700 sm:text-sm border border-gray-300 rounded-md"
                  required
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  /* disabled={!account} */
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex   ml-3 w-40 py-2 px-8  border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  /* disabled={loading} */
                >
                  {/*  {loading ? <Spinner /> : ""} */}
                  <span className="flex-1">Send </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div>Please login to post</div>
      )}
    </div>
  );
}
