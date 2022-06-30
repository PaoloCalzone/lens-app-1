import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { client, GET_PROFILE } from "../../api";

export default function Handle() {
  const router = useRouter();
  const query = router.query;
  const handle = query.handle;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (handle) {
      fetchProfile();
    }
  }, [handle]);

  async function fetchProfile() {
    const response = await client
      .query(GET_PROFILE, { request: { handle } })
      .toPromise();
    console.log("handle fetched profile:", response);
    setProfile(response.data.profile);
  }
  console.log("PRRFILE", profile);
  return (
    <div>
      <h1>{profile.handle}</h1>
      <h3>{profile.name}</h3>
    </div>
  );
}
