import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_POST_TYPED_DATA } from "../api";

export default function Post({ account }) {
  const [post, setPost] = useState("");
  const [createPost, { data, loading, error }] = useMutation(
    gql(CREATE_POST_TYPED_DATA)
  );
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Post", post);
    if (account) {
      const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
      } = useQuery(gql(GET_PROFILE), {
        variables: { request: { ownedBy: account } },
      });
    }
    const response = await createPost({
      variables: {
        request: {
          handle: handle,
        },
      },
    });

    if (response.error)
      alert(`Oooops, something went wrong: ${response.error}`);
    if (response.data && response.data.createProfile.reason == "HANDLE_TAKEN") {
      alert("HANDLE ALREADY TAKEN. TRY ANOTHER ONE");
    }
    if (response.data.createProfile.txHash) {
      settxHash(response.data.createProfile.txHash);
    }
  }
  return (
    <div>
      {account ? (
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
                  disabled={!account}
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
