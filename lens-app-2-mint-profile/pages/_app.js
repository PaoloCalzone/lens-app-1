import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import { login } from "../api/login-user";

function MyApp({ Component, pageProps }) {
  const [userAccount, setUserAccount] = useState();
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
        setUserAccount(account);
        console.log("Accounts", accounts);
        console.log("Actual account", account);
        login(account);
      }
    }
    ethereumConnection();
  }, []);
  return (
    <div>
      <Navbar title="CALOBARY" userAccount={userAccount} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
