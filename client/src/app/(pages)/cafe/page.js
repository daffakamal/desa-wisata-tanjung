"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState, useEffect } from "react";

// Define categories
const categories = ["Semua", "Kopi", "Non Kopi", "Teh", "Jamu"];

export default function Cafe() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cafeData, setCafeData] = useState([]);

  // Fetch cafe data from backend
  const fetchCafeData = async () => {
    try {
      const response = await fetch('/in/cafe');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cafe data:", error);
      return [];
    }
  };

  useEffect(() => {
    const getCafeData = async () => {
      const data = await fetchCafeData();
      setCafeData(data);
    };

    getCafeData();
  }, []);

  // Filter cafe data based on the selected category
  const filteredCafeData =
    selectedCategory === "Semua"
      ? cafeData
      : cafeData.filter((item) => item.kategori === selectedCategory);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 relative overflow-hidden">
      <Navbar />
      <div className="w-full mx-2 bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 27.png')" }}>
        <h1 className="text-3xl font-bold text-white text-center pt-36">Cafe</h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
        Kafe jamu merupakan inisiatif bersama guna mempertahankan budaya jamu sebagai solusi sehat alami dan memanfaatkan potensi TOGA di Kalurahan Donoharjo. 
        Kafe jamu berada di Jalan Noto Sukardjo, RT. 04/RW. 26, Dusun Banteran , Kalurahan Donoharjo, Kapanewon Ngaglik, Kabupaten Sleman. 
        Brand Kafe Jamu milik masyarakat Donoharjo diberi nama “Djampi Waras”. 
        Penamaan tersebut sebagai sebuah harapan agar ramuan herbal yang dihasilkan dapat menyehatkan setiap orang yang mengonsumsinya, baik secara jasmani maupun rohani.
        Kafe jamu beroperasi dari Hari Senin hingga Hari Sabtu. Jam operasional untuk Hari Senin hingga Hari Jumat, yaitu pukul pukul 09.00 - 21.00 WIB. Sementara untuk Hari Sabtu buka pukul 09.00-19.00 WIB.
        </p>
      </div>
      <div className="w-full px-8 md:px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">Daftar Menu</p>
        <div className="flex space-x-3 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-[18px] border-2 text-base ${
                selectedCategory === category
                  ? "bg-[#C2DAFF] text-black"
                  : "bg-transparent border-[#C2DAFF] text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="my-8 w-full px-8 md:px-[180px] grid grid-cols-1 md:grid-cols-4 gap-8">
        {filteredCafeData.map((cafe) => (
          <div key={cafe._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={cafe.gambar} alt={cafe.menu} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-center text-lg font-semibold text-black">{cafe.menu}</p>
              <p className="text-center text-base text-gray-700">Rp {cafe.harga}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
