import React, { useEffect } from "react";
import UserHeader from "./Customer/UserHeader";

function Home() {
  useEffect(() => {
    document.title = "MDMS | Home";
  });

  return (
    <div>
      <UserHeader />
      <div>
        <h1 className="h1">Welcome! to Homepage.</h1>
      </div>
    </div>
  );
}
export default Home;
