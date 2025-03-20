import React from "react";
import {
  RiKey2Fill,
  RiSmartphoneFill,
  RiMailFill,
  RiGlobalFill,
  RiCloudFill,
} from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import { RevealLRLR } from "@/components/animations/reveal";

export default function Features() {
  return (
    <section id="features">
      <div className="max-w-4xl container mx-auto px-5 my-16">
        <div className="text-center">
          <RevealLRLR>
            <h2 className="font-semibold text-3xl text-slate-300">
              Features you&apos;ll love
            </h2>
          </RevealLRLR>
          <RevealLRLR>
            <p className="max-w-md mx-auto mt-2 text-slate-300">
              Securely store and manage all your digital accounts in one
              easy-to-access place
            </p>
          </RevealLRLR>
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <RevealLRLR>
            <div className="flex gap-4 items-start">
              <span className="text-sky-500 bg-sky-500/10 p-3 rounded-full">
                <RiKey2Fill className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-xl text-slate-700">
                  Secure Storage
                </h3>
                <p className="mt-1 text-slate-300">
                  Strong encryption system to protect your account data.
                  Security is our top priority.
                </p>
              </div>
            </div>
          </RevealLRLR>
          <RevealLRLR>
            <div className="flex gap-4 items-start">
              <span className="text-sky-500 bg-sky-500/10 p-3 rounded-full">
                <RiSmartphoneFill className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-xl text-slate-700">
                  Multi-Platform Access
                </h3>
                <p className="mt-1 text-slate-300">
                  Access your account from multiple devices - mobile, tablet &
                  desktop. Synchronized in real-time.
                </p>
              </div>
            </div>
          </RevealLRLR>
          <RevealLRLR>
            <div className="flex gap-4 items-start">
              <span className="text-sky-500 bg-sky-500/10 p-3 rounded-full">
                <RiMailFill className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-xl text-slate-700">
                  Recovery Support
                </h3>
                <p className="mt-1 text-slate-300">
                  Easy account recovery system with email verification. No need
                  to worry about losing access.
                </p>
              </div>
            </div>
          </RevealLRLR>
          <RevealLRLR>
            <div className="flex gap-4 items-start">
              <span className="text-sky-500 bg-sky-500/10 p-3 rounded-full">
                <RiGlobalFill className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-xl text-slate-700">
                  Cross Platform
                </h3>
                <p className="mt-1 text-slate-300">
                  Supports various online platforms and services. Keep your
                  accounts from social media to email in one place.
                </p>
              </div>
            </div>
          </RevealLRLR>
          <RevealLRLR>
            <div className="flex gap-4 items-start">
              <span className="text-sky-500 bg-sky-500/10 p-3 rounded-full">
                <RiCloudFill className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-xl text-slate-700">
                  Cloud Backup
                </h3>
                <p className="mt-1 text-slate-300">
                  Store your account data securely in the cloud and access it
                  anytime. anytime. Data is always safely stored.
                </p>
              </div>
            </div>
          </RevealLRLR>
          <RevealLRLR>
            <div className="flex gap-4 items-start">
              <span className="text-sky-500 bg-sky-500/10 p-3 rounded-full">
                <SiMicrosoftexcel className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-xl text-slate-700">
                  Export to Excel
                </h3>
                <p className="mt-1 text-slate-300">
                  Best storage with export system to MS Excel for those who want
                  to record accounts locally
                </p>
              </div>
            </div>
          </RevealLRLR>
        </div>
      </div>
    </section>
  );
}
