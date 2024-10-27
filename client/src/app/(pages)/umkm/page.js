"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState, useEffect } from "react";

const categories = ["Semua", "Kuliner", "Non-kuliner"];

export default function UMKM() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [umkmData, setUMKMData] = useState([]);

  const fetchUMKMData = async () => {
    try {
      const response = await fetch('/in/umkm');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching UMKM data:', error);
      return [];
    }
  };

  useEffect(() => {
    const getUMKMData = async () => {
      const data = await fetchUMKMData();
      setUMKMData(data);
    };

    getUMKMData();
  }, []);

  const filteredUMKM =
    selectedCategory === "Semua"
      ? umkmData
      : umkmData.filter((item) => item.kategori === selectedCategory);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100  overflow-hidden">
      <Navbar />
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/header-kesenian.png')" }}
      >
        <h1 className="text-3xl font-bold text-white text-center pt-36">
          Usaha Mikro Kecil dan Menengah
        </h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
          Potensi UMKM yang ada di Dusun Banteran dan sekitarnya mulai dari
          usaha kuliner maupun non-kuliner dengan total lebih dari 20 UMKM.
        </p>
      </div>
      <div className="w-full px-8 md:px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">
          Daftar Usaha Mikro Kecil dan Menengah
        </p>
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
      <div className="my-8 w-full px-8 md:px-[180px]">
        {filteredUMKM.map((umkm) => (
          <div
            key={umkm.id}
            className="flex flex-col md:flex-row items-center mb-8 bg-white p-5 rounded-lg shadow-md"
          >
            <img
              src={umkm.gambar}
              alt={umkm.umkm}
              className="w-auto md:min-w-[320px] h-[190px] object-cover rounded"
            />
            <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-black">
              <h4 className="text-lg font-bold mb-2">{umkm.umkm}</h4>
              <p>Usaha: {umkm.usaha}</p>
              <p>Alamat: {umkm.alamat}</p>
              <p>No. HP: {umkm.nomor}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
