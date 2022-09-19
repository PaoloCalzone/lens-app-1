import { useEffect, useState } from "react";
import { login, GET_PROFILES } from "../api";
import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import Spinner from "../components/Spinner";
import Seo from "../utils/Seo";
import Post from "../components/Post";
import { apolloClient } from "../apollo-client";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [profile, setProfile] = useState(null);
  const [post, setPost] = useState("");
  const [txHash, settxHash] = useState(null);

  async function lensLogin() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const data = await login(accounts[0]);
    if (data.authenticate.accessToken) setAccount(accounts[0]);
    console.log("Address", accounts[0]);
    const response = await apolloClient.query({
      query: gql(GET_PROFILES),
      variables: { request: { ownedBy: accounts[0] } },
    });
    setProfile(response.data.profiles.items[0].id);
  }

  return (
    <Layout>
      <Seo />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <section className="relative py-12">
          <h1 className="text-lg my-8">
            <span className="text-2xl">1.</span> Connect your wallet, select{" "}
            <strong>Polygon Mumbai</strong> network and <strong>sign</strong>{" "}
            the transaction to be logged in.
          </h1>
          <div className="flex justify-end">
            <button
              className="bg-emerald-600 w-40 py-2 px-4 text-center border border-gray-300 rounded-full shadow-sm text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
              onClick={() => lensLogin()}
            >
              Login
            </button>
          </div>
          {account && (
            <div>
              <h1 className="text-lg my-8">
                <span className="text-2xl">2.</span> Write something memorable!
              </h1>
              <div className="my-16 space-y-12">
                <Post account={account} />

                <h1 className="text-lg my-8">
                  <span className="text-2xl">3.</span>{" "}
                  {txHash ? "Congrats! See what happened:" : "Curious?"}
                </h1>
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
