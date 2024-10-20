"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState } from "react";

const kesenianData = [
  {
    id: 1,
    gambar: "/images/gejog-lesung.png",
    kesenian: "Gejog Lesung",
    deskripsi:
      "Seni musik yang mengekspresikan kegembiraan kaum petani pedesaan setelah melaksanakan masa panen. Gejog lesung berkembang pesat di DIY dan Kabupaten Sleman. Alat musik gejog lesung dimainkan dengan cara dipukul-pukul menggunakan tongkat kayu yang disebut alu. Satu lesung biasanya dimainkan oleh empat sampai lima orang.",
  },
  {
    id: 2,
    gambar: "/images/pek-bung.jpg",
    kesenian: "Pek Bung",
    deskripsi:
      "Kesenian tradisional yang diiringi alat musik tradisional, seperti klenting, bambu bumbung, seruling, kentongan, dan juga bunyi-bunyian lain untuk perpaduan irama. Kesenian ini awalnya digunakan sebagai sarana dakwah agama Islam serta sering ditampilkan dalam acara-acara tertentu seperti pesta pernikahan, sunat, merti desa, penyambutan tamu, dan peringatan hari besar Islam.",
  },
  {
    id: 3,
    gambar: "/images/jathilan.jpg",
    kesenian: "Jathilan",
    deskripsi:
      "Jathilan adalah sebuah kesenian yang menyatukan antara unsur gerakan tari dengan magis. Jenis kesenian ini dimainkan dengan properti berupa kuda tiruan, yang terbuat dari anyaman bambu atau kepang. Jathilan di DIY tersebar di kabupaten dan kota dengan memiliki ciri khusus yang berbeda antara satu daerah dengan daerah yang lain.",
  },
];

const categories = ["Semua", "Gejog Lesung", "Pek Bung", "Jathilan"];

export default function Kesenian() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredKesenian =
    selectedCategory === "Semua"
      ? kesenianData
      : kesenianData.filter(
          (item) =>
            item.kesenian.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 overflow-hidden">
      <Navbar />
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/header-kesenian.png')" }}
      >
        <h1 className="text-3xl font-bold text-white text-center pt-36">
          Kesenian
        </h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
          Potensi berbagai kesenian yang ada di Dusun Tanjung dan sekitarnya,
          seperti kesenian Pek Bung, Jathilan, dan Gejog Lesung.
        </p>
      </div>
      <div className="w-full px-8 md:px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">Daftar Kesenian</p>
        <div className="flex space-x-3 mt-4 py-2 overflow-y-auto">
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
        {filteredKesenian.map((kesenian) => (
          <div
            key={kesenian.id}
            className="flex flex-col md:flex-row items-center mb-8 bg-white p-5 rounded-lg shadow-md"
          >
            <img
              src={kesenian.gambar}
              alt={kesenian.kesenian}
              className="w-auto md:min-w-[320px] h-[190px] object-cover rounded"
            />
            <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-black">
              <h4 className="text-xl font-bold mb-2">{kesenian.kesenian}</h4>
              <p>{kesenian.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
