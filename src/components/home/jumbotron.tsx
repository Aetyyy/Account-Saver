import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RevealLRLR } from "@/components/animations/reveal";

export default function Jumbotron() {
  return (
    <section about="jumbotron" content="jumbotron" id="jumbotron">
      <div className="bg-navbar-light py-20 mt-4">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="w-full md:w-1/2 lg:w-2/3">
              <RevealLRLR>
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
                  Welcome to our <br className="hidden md:block" />
                  <span className="text-sky-500">Account</span> Saver
                </h1>
              </RevealLRLR>
              <RevealLRLR>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
                  Provide your digital assistant to store and manage accounts
                  from multiple platforms. Quick access, secure storage, and no
                  more resetting passwords over and over again.
                </p>
              </RevealLRLR>
              <RevealLRLR>
                <div className="flex gap-2">
                  <Link
                    href="/register"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-md"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#about"
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md"
                  >
                    Learn More
                  </Link>
                </div>
              </RevealLRLR>
            </div>
            <RevealLRLR>
              <div className="w-full">
                <Image
                  src="/logo.png"
                  alt="Hero Image"
                  width={500}
                  height={500}
                  className="rounded-lg select-none"
                  draggable={false}
                  priority
                />
              </div>
            </RevealLRLR>
          </div>
        </div>
      </div>
    </section>
  );
}
