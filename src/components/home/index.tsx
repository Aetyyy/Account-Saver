"use client";

import Loading from "@/components/loading";
import React, { useEffect, useState } from "react";
import About from "@/components/home/about";
import Features from "@/components/home/features";
import Jumbotron from "@/components/home/jumbotron";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Jumbotron />
          <About />
          <Features />
        </>
      )}
    </>
  );
}
