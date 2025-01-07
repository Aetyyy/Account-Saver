"use client";

import Loading from "@/components/loading";
import React, { useEffect, useState, useMemo } from "react";
import About from "@/components/home/about";
import Features from "@/components/home/features";
import Jumbotron from "@/components/home/jumbotron";

// Buat komponen terpisah yang di-memo
const MemoizedAbout = React.memo(About);
const MemoizedFeatures = React.memo(Features);
const MemoizedJumbotron = React.memo(Jumbotron);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Gunakan useMemo untuk konten yang akan di-render
  const content = useMemo(() => (
    <>
      <MemoizedJumbotron />
      <MemoizedAbout />
      <MemoizedFeatures />
    </>
  ), []); // Empty dependency array karena konten statis

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik loading time

    return () => clearTimeout(timer);
  }, []); // Hapus dependency

  return (
    <>
      {isLoading ? <Loading /> : content}
    </>
  );
}