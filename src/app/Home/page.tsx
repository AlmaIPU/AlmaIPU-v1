"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const handelNavigate = () => {
    router.push("/Login");
  };
  return (
    <>
      <div>Home</div>
      <div>
        <button onClick={handelNavigate}>
          login
        </button>
      </div>
    </>
  );
};

export default HomePage;
