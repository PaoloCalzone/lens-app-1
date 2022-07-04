import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { client, GET_PROFILE, GET_PUBLICATIONS } from "../../api";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import moment from "moment";
import { timestamp } from "../../utils/moment.tsx";

export default function Handle() {
  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const [profile, setProfile] = useState({});
  const [publications, setPublications] = useState([]);
  let date = new Date();

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchPublications();
    }
  }, [id]);
  console.log("ID", id);
  async function fetchProfile() {
    const response = await client
      .query(GET_PROFILE, { request: { profileId: id } })
      .toPromise();
    setProfile(response.data.profile);
  }

  async function fetchPublications() {
    const response = await client
      .query(GET_PUBLICATIONS, {
        id,
      })
      .toPromise();
    console.log(response.data.publications);
    setPublications(response.data.publications.items);
  }

  console.log("Publications2", publications);
  return (
    <div className={styles.container}>
      <h1>{profile.handle}</h1>
      {profile.coverPicture ? (
        <Image
          src={profile.coverPicture.original.url}
          width="100%"
          height="100%"
        />
      ) : (
        <div></div>
      )}
      <h3>{profile.name}</h3>
      <h2>Bio:</h2>
      <p>{profile.bio}</p>
      <h2>Publications:</h2>
      {publications.map((publication, index) => (
        <div key={index} className={styles.card}>
          <h6>
            <div>
              <strong>{profile.name}</strong> @{profile.handle} -{" "}
              {timestamp(publication.createdAt)}
            </div>
          </h6>
          <p style={{ color: "green", fontSize: "150%" }}>
            {publication.metadata.content}
          </p>
        </div>
      ))}
    </div>
  );
}
