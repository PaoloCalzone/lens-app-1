export default function Navbar({ title, userAccount }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <h1>{title}</h1>

      <div>
        <strong>account: </strong>
        {userAccount ? <span>{userAccount}</span> : <span>not connected</span>}
      </div>
    </div>
  );
}
