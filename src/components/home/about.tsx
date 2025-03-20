"use client";

import Image from "next/image";
import React from "react";
import { RevealLRLR } from "@/components/animations/reveal";

export default function About() {
  return (
    <section id="about" className="my-16 md:my-36">
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
                Account Saver is a specialized platform designed to securely
                store and manage all your account credentials from multiple
                platforms...
              </p>
            </RevealLRLR>
          </div>
        </div>
      </div>
    </section>
  );
}
