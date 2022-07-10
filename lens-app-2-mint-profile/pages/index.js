import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { urqlClient, RECOMMENDED_PROFILES } from "../api";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    console.log("window.ethereum", window.ethereum);
    async function ethereumConnection() {
      if (typeof window.ethereum === "undefined") {
        console.log("Connect your wallet");
      } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const addresses = await provider.listAccounts();
        console.log("listAccounts", addresses);
        const account = accounts[0];
        console.log("Accounts", accounts);
        console.log("Actual account", account);
      }
    }
    ethereumConnection();
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const client = urqlClient;
      const response = await client.query(RECOMMENDED_PROFILES).toPromise();
      setProfiles(response.data.recommendedProfiles);
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
