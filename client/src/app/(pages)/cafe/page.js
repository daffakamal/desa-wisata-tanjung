"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState, useEffect } from "react";

// Define categories
const categories = ["Semua", "Kopi", "Non Kopi", "Teh", "Jamu"];

const formatRupiah = (angka) => {
  return angka.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2
  });
};

export default function Cafe() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cafeData, setCafeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      try {
        const data = await fetchCafeData();
        setCafeData(data);
      } catch (error) {
        console.error("Error setting cafe data:", error);
      } finally {
        setIsLoading(false);
      }
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
        <p className="text-lg text-white text-center px-8 md:px-20  pt-3 pb-20">
        Kafe jamu merupakan inisiatif bersama guna mempertahankan budaya jamu sebagai solusi sehat alami dan memanfaatkan potensi TOGA di Kalurahan Donoharjo.  
        </p>
      </div>
      <div className="w-full mt-4 px-8 md:px-[180px]">
      <div className="container mx-auto py-8">
    <h2 className="font-bold text-center text-2xl py-4">Djampi Waras</h2>
    <div className="flex justify-center mb-6">
        <img src="/images/djampi.png" className="max-w-full rounded-xl shadow-md object-cover" />
    </div>
    <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-center">Brand Kafe Jamu milik masyarakat Donoharjo diberi nama &quot;Djampi Waras&quot;. Penamaan tersebut sebagai sebuah harapan agar ramuan herbal yang dihasilkan dapat menyehatkan setiap orang yang mengonsumsinya, baik secara jasmani maupun rohani.</p>
        
        <div className="mt-12">
            <h2 className="font-bold text-xl mb-2">Alamat</h2>
            <p className="text-gray-600"> Jalan Noto Sukardjo, RT. 04/RW. 26, Dusun Banteran , Kalurahan Donoharjo, Kapanewon Ngaglik, Kabupaten Sleman.</p>
        </div>
        
        <div>
            <h2 className="font-bold text-xl mb-2">Jam Operasi</h2>
            <div className="text-gray-600">
                <p>Senin-Jumat  : 09.00 - 21.00 WIB</p>
                <p>Sabtu  : 09.00 - 19.00 WIB</p>
            </div>
        </div>
    </div>
</div>
        <p className="mt-8 text-xl font-bold text-black">Daftar Menu</p>
        <div className="flex space-x-3 mt-4 overflow-y-auto">
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
      {isLoading ? (
       <div class="lds-ripple">
        <div class="ripple-circle"></div>
        <div class="ripple-circle delay"></div>
       </div>
      ) : (
        <div className="my-8 w-full px-8 md:px-[180px] grid grid-cols-1 md:grid-cols-4 gap-8">
          {filteredCafeData.length > 0 ? (
            filteredCafeData.map((cafe) => (
              <div key={cafe._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={cafe.gambar} alt={cafe.menu} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-center text-lg font-semibold text-black">{cafe.menu}</p>
                  <p className="text-center text-base text-gray-700">
                    {formatRupiah(cafe.harga)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Tidak ada menu yang tersedia
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}