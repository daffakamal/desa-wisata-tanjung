"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // State to check if component is mounted
  const router = useRouter(); // Get the router object

  // Use effect to set mounted to true when component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to check if the current route is active
  const isActive = (path) => mounted && router.pathname === path;

  return (
    <div className="flex justify-between items-center w-full h-[75px] px-8 md:px-28 text-white bg-[#242424] fixed z-40">
      <Link className="ml-2" href="/">
        <h1 className="md:text-[22px] font-bold text-lg">Desa Wisata Tanjung</h1>
      </Link>
      <ul className="hidden lg:flex">
        <li className={`px-7 cursor-pointer capitalize font-medium hover:scale-105 duration-200 ${isActive("/") ? "text-yellow-400" : "text-white"}`}>
          <Link href="/">Beranda</Link>
        </li>
        <li onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative px-7 cursor-pointer capitalize text-center font-medium hover:scale-105 duration-200">
          <span className={`hover:text-white ${isActive("/umkm") || isActive("/toga") || isActive("/kesenian") ? "text-yellow-400" : "text-white"}`}>
            Informasi
          </span>
          {/* Dropdown Menu */}
          <ul
            className={`absolute top-full left-0 right-0 bg-[#242424] text-white pt-2 py-2 rounded-lg ${dropdownOpen ? "block" : "hidden"}`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <li className={`px-4 py-2 hover:bg-gray-700 ${isActive("/umkm") ? "text-yellow-400" : ""}`}>
              <Link href="/umkm">UMKM</Link>
            </li>
            <li className={`px-4 py-2 hover:bg-gray-700 ${isActive("/toga") ? "text-yellow-400" : ""}`}>
              <Link href="/toga">Agro</Link>
            </li>
            <li className={`px-4 py-2 hover:bg-gray-700 ${isActive("/kesenian") ? "text-yellow-400" : ""}`}>
              <Link href="/kesenian">Kesenian</Link>
            </li>
          </ul>
        </li>
        <li className={`px-7 cursor-pointer capitalize font-medium hover:scale-105 duration-200 ${isActive("/gallery") ? "text-yellow-400" : "text-white"}`}>
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className={`px-7 cursor-pointer capitalize font-medium hover:scale-105 duration-200 ${isActive("/cafe") ? "text-yellow-400" : "text-white"}`}>
          <Link href="/cafe">Cafe</Link>
        </li>
        <li className={`px-7 cursor-pointer capitalize font-medium hover:scale-105 duration-200 ${isActive("/lembagaKonservasi") ? "text-yellow-400" : "text-white"}`}>
          <Link href="/lembagaKonservasi">Lembaga</Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-white lg:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
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
            <Link onClick={() => setNav(!nav)} href="/lembagaKonservasi">Lembaga</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
