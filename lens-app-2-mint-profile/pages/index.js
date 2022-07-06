import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { client, RECOMMENDED_PROFILES } from "../api";
import { useState, useEffect } from "react";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const response = await client.query(RECOMMENDED_PROFILES).toPromise();
      console.log({ response });
      setProfiles(response.data.recommendedProfiles);
      console.log("PROFILES", profiles);
    } catch (err) {
      console.log(err);
    }
  }

  console.log("profiles are:", profiles);
  return (
    <div className={styles.container}>
      <h1>CALOBARY</h1>
      {profiles.map((profile, index) => (
        <Link key={index} href={`/profile/${profile.id}`}>
          <a>
            <div className={styles.card}>
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
