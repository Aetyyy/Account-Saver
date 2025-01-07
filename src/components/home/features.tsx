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
      <div className="max-w-4xl container mx-auto px-5 mt-16">
        <div className="text-center">
          <RevealLRLR>
            <h2 className="font-semibold text-3xl text-slate-300">
              Features you'll love
            </h2>
          </RevealLRLR>
          <RevealLRLR>
            <p className="max-w-md mx-auto mt-2 text-slate-300">
              Simpan dan kelola semua akun digital Anda dengan aman dalam satu
              tempat yang mudah diakses
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
                  Sistem enkripsi yang kuat untuk melindungi data akun Anda.
                  Keamanan adalah prioritas utama kami.
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
                  Akses akun Anda dari berbagai perangkat - mobile, tablet &
                  desktop. Tersinkronisasi secara real-time.
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
                  Sistem pemulihan akun yang mudah dengan verifikasi email.
                  Tidak perlu khawatir kehilangan akses.
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
                  Mendukung berbagai platform dan layanan online. Simpan akun
                  dari sosial media hingga email dalam satu tempat.
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
                  Simpan data akun Anda dengan aman di cloud dan akses kapan
                  saja. Data selalu tersimpan dengan aman.
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
                  Penyimpanan terbaik dengan sistem ekspor ke MS Excel untuk
                  anda yang ingin menyatat akun di lokal
                </p>
              </div>
            </div>
          </RevealLRLR>
        </div>
      </div>
    </section>
  );
}
