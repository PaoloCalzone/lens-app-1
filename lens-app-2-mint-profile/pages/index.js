import Image from "next/image";
import Link from "next/link";
import { urqlClient, RECOMMENDED_PROFILES } from "../api";
import { useState, useEffect } from "react";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const client = await urqlClient();
      const response = await client.query(RECOMMENDED_PROFILES).toPromise();
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log(err);
    }
  }

  console.log("profiles are:", profiles);
  return (
    <div >
      {profiles.map((profile, index) => (
        <Link key={index} href={`/profile/${profile.id}`}>
          <a>
            <div >
              {profile.picture ? (
                <Image
                  src={profile.picture.original.url}
                  width="60px"
                  height="60px"
                />
              ) : (
                <div
                  style={{
                    width: "60px",
                    heigth: "60px",
                    backgroundColor: "black",
                  }}
                >
                  akakak
                </div>
              )}

              <div>{profile.handle}</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
