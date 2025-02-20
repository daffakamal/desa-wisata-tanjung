"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useEffect, useState } from "react";

const categories = ["Semua", "Gejog Lesung", "Pek Bung", "Jathilan"];

export default function Kesenian() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [kesenianData, setKesenianData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKesenianData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/in/kesenian');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Kesenian data:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getKesenianData = async () => {
      const data = await fetchKesenianData();
      setKesenianData(data);
    };

    getKesenianData();
  }, []);

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
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <div className="lds-ripple">
              <div className="ripple-circle"></div>
              <div className="ripple-circle delay"></div>
            </div>
          </div>
        ) : filteredKesenian.length > 0 ? (
          filteredKesenian.map((kesenian) => (
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
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Kesenian tidak ditemukan
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
