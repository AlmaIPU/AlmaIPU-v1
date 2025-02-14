"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const handelNavigate = () => {
    router.push("/Login");
  };
  const handleDashboard = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <div>Home</div>
      <div>
        <button onClick={handelNavigate}>login</button>
      </div>
      <div>
        <button onClick={handleDashboard}>Dashboard</button>
      </div>
    </>
  );
};

export default HomePage;
