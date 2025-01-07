"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { RevealLRLR } from "@/components/animations/reveal";

export default function About() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            history.pushState(null, "", "/about");
          } else {
            history.pushState(null, "", "/");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={scrollPosition > 0 ? "my-16 md:my-64" : "my-16 md:my-64"}
    >
      <div className="flex flex-col items-center max-w-screen-xl mx-auto">
        <RevealLRLR>
          <div className="w-full p-10 flex justify-center">
            <div className="image object-center text-center">
              <Image
                src="/protect.jpg"
                className="w-full h-auto shadow-xl shadow-gray-900 rounded-md select-none"
                alt="Security illustration"
                width={2000}
                height={2000}
                priority
                draggable={false}
              />
            </div>
          </div>
        </RevealLRLR>
        <div className="w-full p-5 flex flex-col justify-center items-center text-center">
          <div className="text">
            <RevealLRLR>
              <span className="text-slate-500 border-b-2 border-sky-600 uppercase">
                About us
              </span>
            </RevealLRLR>
            <RevealLRLR>
              <h2 className="my-4 font-bold text-3xl sm:text-4xl text-slate-700">
                About <span className="text-sky-600">Our Storage</span>
              </h2>
            </RevealLRLR>
            <RevealLRLR>
              <p className="text-slate-300 text-pretty">
                Account Saver adalah platform khusus yang dirancang untuk
                menyimpan dengan aman dan mengelola semua kredensial akun Anda
                dari berbagai platform...
              </p>
            </RevealLRLR>
          </div>
        </div>
      </div>
    </section>
  );
}
