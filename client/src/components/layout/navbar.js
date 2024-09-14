"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  return (
    <div className="flex justify-between items-center w-full h-[75px] px-28 text-white bg-[#242424] fixed z-40">
      <Link className="ml-2" href="/">
        <h1 className="text-[22px] font-bold">Desa Wisata Tanjung</h1>
      </Link>
      <ul className="hidden md:flex">
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/">Beranda</Link>
        </li>
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/umkm">UMKM</Link>
        </li>
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/toga">Agro</Link>
        </li>
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/kesenian">Kesenian</Link>
        </li>
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/cafe">Cafe</Link>
        </li>
        <li className="px-7 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200">
          <Link href="/lembagaKonservasi">Lembaga Konservasi</Link>
        </li>
      </ul>
      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-white md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#242424] text-white">
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/">Beranda</Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/umkm">UMKM</Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/toga">Agro</Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/kesenian">Kesenian</Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/gallery">Gallery</Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/cafe">Cafe</Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/lembagaKonservasi">Lembaga Konservasi</Link>
          </li>
        </ul>
      )}
    </div>
  );
};