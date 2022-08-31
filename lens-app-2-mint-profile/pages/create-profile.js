import { useState } from "react";
import { gql } from "urql";
import { CREATE_PROFILE } from "../api";

export default function CreateProfile() {
  const [handle, setHandle] = useState("");
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  const [followNFTURI, setFollowNFTURI] = useState(null);
  const [followModule, setFollowModule] = useState(null);

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div></div>
        </form>
      </section>
    </div>
  );
}
