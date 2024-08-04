"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100">
      <div
        className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/images/landingpage.png')" }}
      >
        <div className="flex flex-col items-center justify-center px-20">
          <h1 className="leading-tight text-[60px] max-w-[675px] font-bold text-white text-center pt-20 pb-5">
            Selamat Datang di Desa Wisata Tanjung
          </h1>
          <div className="flex flex-row space-x-5 items-center justify-center">
            <Link href="#tentang" className="text-white text-center px-5 py-3 bg-transparent rounded-2xl border-2">
              <button>Selengkapnya</button>
            </Link>
            <Link href="#potensi" className="text-white text-center px-5 py-3 bg-[#3887FF] border-[#3887FF] rounded-2xl border-2">
              <button>Lihat Potensi</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
