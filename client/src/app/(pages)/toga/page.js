"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState, useEffect } from "react";

const categories = ["Semua", "Jahe", "Serai", "Kunyit", "Kencur", "Temulawak"];

export default function Toga() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [tanamanObatData, setTanamanObatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTanamanObatData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/in/tanaman-obat');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Tanaman Obat data:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getTanamanObatData = async () => {
      const data = await fetchTanamanObatData();
      setTanamanObatData(data);
    };

    getTanamanObatData();
  }, []);

  const filteredTanamanObat =
    selectedCategory === "Semua"
      ? tanamanObatData
      : tanamanObatData.filter(
          (item) =>
            item.tanaman.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 overflow-hidden">
      <Navbar />
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Group 27.png')" }}
      >
        <h1 className="text-3xl font-bold text-white text-center pt-36">
          Tanaman Obat Keluarga
        </h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
          Program penanaman tanaman obat keluarga di Dusun Banteran dan Desa
          Tanjung yang diinisiasi oleh BEM KM UGM 2024
        </p>
      </div>
      <div className="w-full px-8 md:px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">Daftar Tanaman Obat</p>
        <div className="flex space-x-3 mt-4 py-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-1.5 rounded-[18px] border-2 text-base ${
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
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <div className="lds-ripple">
              <div className="ripple-circle"></div>
              <div className="ripple-circle delay"></div>
            </div>
          </div>
        ) : filteredTanamanObat.length > 0 ? (
          filteredTanamanObat.map((tanaman) => (
            <div
              key={tanaman.id}
              className="flex flex-col md:flex-row items-center mb-8 bg-white p-5 rounded-lg shadow-md"
            >
              <img
                src={tanaman.gambar}
                alt={tanaman.tanaman}
                className="w-auto md:min-w-[320px] h-[190px] object-cover rounded"
              />
              <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-black">
                <h3 className="text-xl font-bold">{tanaman.tanaman}</h3>
                <p>Nama Latin: {tanaman.namaLatin}</p>
                <p>Deskripsi: {tanaman.deskripsi}</p>
                <p>Manfaat: {tanaman.manfaat}</p>
                <p>Bentuk Olahan: {tanaman.bentukOlahan}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Tanaman obat tidak ditemukan
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
