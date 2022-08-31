import { useState } from "react";
import { gql } from "urql";
import { CREATE_PROFILE } from "../api";

export default function CreateProfile() {
  const [handle, setHandle] = useState("");
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  const [followNFTURI, setFollowNFTURI] = useState(null);
  const [followModule, setFollowModule] = useState(null);

  function handleSubmit() {
    console.log("Handle is", handle);
  }

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex-col">
            <label htmlFor="handle">Handle</label>
            <input
              id="handle"
              name="handle"
              type="text"
              required
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
            <label htmlFor="pictureUri">Avatar</label>
            <input
              type="text"
              name="profilePictureURI"
              onChange={(e) => {
                setProfilePictureUri(e.target.value);
              }}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
