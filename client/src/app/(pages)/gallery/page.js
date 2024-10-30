"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState([]);

  // Fungsi untuk mengambil data gallery dari backend
  const fetchGalleryData = async () => {
    try {
      const response = await fetch("/in/gallery"); // Sesuaikan path ini dengan route backend Anda
      const data = await response.json();
      setGalleryData(data); // Menyimpan data ke state
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  // useEffect untuk menjalankan fetchGalleryData ketika komponen pertama kali dirender
  useEffect(() => {
    fetchGalleryData();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 relative overflow-hidden">
      <Navbar />
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Group 27.png')" }}
      >
        <h1 className="text-3xl font-bold text-white text-center pt-36">
          Gallery
        </h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
          Dokumentasi tanaman obat keluarga di Dusun Banteran dan Desa Tanjung
        </p>
      </div>
      <div className="w-full px-8 md:px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">Daftar Tanaman Obat</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4 mb-8">
          {galleryData.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={item.gambar}
                alt={item.tanaman}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-center text-lg font-semibold text-black">
                  {item.tanaman}
                </p>
                <p className="text-center text-sm text-gray-600">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}
