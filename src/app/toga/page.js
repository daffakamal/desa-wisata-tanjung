"use client";

import Navbar from "@/components/layout/navbar";
import { useState } from "react";

const tanamanObatData = [
  {
    id: 1,
    gambar: "/images/gambar-tanaman-jahe.jpg",
    tanaman: "Jahe",
    namaLatin: "Zingiber officinale",
    deskripsi: "Deskripsi jahe...",
    manfaat: "Manfaat jahe...",
    bentukOlahan: "Bentuk olahan jahe...",
  },
  {
    id: 2,
    gambar: "/images/serai.jpg",
    tanaman: "Serai",
    namaLatin: "Cymbopogon citratus",
    deskripsi: "Deskripsi serai...",
    manfaat: "Manfaat serai...",
    bentukOlahan: "Bentuk olahan serai...",
  },
  {
    id: 3,
    gambar: "/images/kunyit.jpg",
    tanaman: "Kunyit",
    namaLatin: "Cymbopogon citratus",
    deskripsi: "Deskripsi serai...",
    manfaat: "Manfaat serai...",
    bentukOlahan: "Bentuk olahan serai...",
  },
  {
    id: 4,
    gambar: "/images/kencur.jpg",
    tanaman: "Kencur",
    namaLatin: "Cymbopogon citratus",
    deskripsi: "Deskripsi serai...",
    manfaat: "Manfaat serai...",
    bentukOlahan: "Bentuk olahan serai...",
  },
  {
    id: 5,
    gambar: "/images/temulawak.jpeg",
    tanaman: "Temulawak",
    namaLatin: "Cymbopogon citratus",
    deskripsi: "Deskripsi serai...",
    manfaat: "Manfaat serai...",
    bentukOlahan: "Bentuk olahan serai...",
  },
];

const categories = ["Semua", "Jahe", "Serai", "Kunyit", "Kencur", "Temulawak"];

export default function Toga() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredTanamanObat =
    selectedCategory === "Semua"
      ? tanamanObatData
      : tanamanObatData.filter(
          (item) =>
            item.tanaman.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 pb-12">
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
      <div className="w-full px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">Daftar Tanaman Obat</p>
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
      <div className="mt-8 w-full px-[180px]">
        {filteredTanamanObat.map((tanaman) => (
          <div
            key={tanaman.id}
            className="flex flex-col md:flex-row items-center mb-8 bg-white p-4 rounded shadow-md"
          >
            <img
              src={tanaman.gambar}
              alt={tanaman.tanaman}
              className="w-full md:w-[300px] h-[190px] object-cover rounded"
            />
            <div className="ml-0 md:ml-4 mt-4 md:mt-0 text-black">
              <h3 className="text-xl font-bold">{tanaman.tanaman}</h3>
              <p>Nama Latin: {tanaman.namaLatin}</p>
              <p>Deskripsi: {tanaman.deskripsi}</p>
              <p>Manfaat: {tanaman.manfaat}</p>
              <p>Bentuk Olahan: {tanaman.bentukOlahan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
