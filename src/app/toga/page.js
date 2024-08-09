"use client";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { useState } from "react";

const tanamanObatData = [
  {
    id: 1,
    gambar: "/images/gambar-tanaman-jahe.jpg",
    tanaman: "Jahe",
    namaLatin: "Zingiberaceae",
    deskripsi:
      "Tanaman obat tradisional dan bumbu dapur. Jahe mengandung zat gingerol dan shogaol sebagai antioksidan.",
    manfaat: "Mengurangi reaksi inflamasi, mengendalikan kadar gula darah, meredakan mual, membantu meredakan berbagai gangguan sistem pencernaan.",
    bentukOlahan: "Serbuk jahe, asinan jahe, sirup jahe, instan jahe, permen jahe, manisan jahe.",
  },
  {
    id: 2,
    gambar: "/images/serai.jpg",
    tanaman: "Serai",
    namaLatin: "Cymbopogon citratus",
    deskripsi: "Tumbuhan rumput-rumputan yang dimanfaatkan sebagai bumbu dapur untuk mengharumkan makanan dan sebagai obat berbagai penyakit.",
    manfaat: "Anti kanker, mengatasi diabetes, mengobati anemia, mengatasi bakteri dan jamur",
    bentukOlahan: "Lilin aromaterapi, spray anti nyamuk, serbuk serai, pestisida alami, karbol serai, teh herbal.",
  },
  {
    id: 3,
    gambar: "/images/kunyit.jpg",
    tanaman: "Kunyit",
    namaLatin: "Curcuma longa",
    deskripsi: "Tanaman obat berupa semak dan bersifat tahunan (perenial) yang tersebar di seluruh daerah tropis. Tanaman kunyit termasuk salah satu tanaman rempah-rempah dan obat asli dari wilayah Asia Tenggara.",
    manfaat: "Membantu meningkatkan daya tahan tubuh, meredakan nyeri haid, meredakan gatal-gatal pada kulit, dan membantu mengatasi gangguan sistem pencernaan.",
    bentukOlahan: "Bubuk kunyit, jamu kunyit, bumbu masakan, masker kunyit",
  },
  {
    id: 4,
    gambar: "/images/kencur.jpg",
    tanaman: "Kencur",
    namaLatin: "Kaempferia galanga",
    deskripsi: "tanaman tropis yang tumbuh dengan subur di berbagai pelosok daerah di Indonesia, baik sebagai tanaman yang dipelihara maupun dibudidayakan. Kencur juga banyak digunakan sebagai ramuan obat tradisional dan sebagai bumbu penyedap masakan.",
    manfaat: "Mengurangi sakit gigi, menurunkan demam, meredakan sakit perut, membantu mengatasi diare.",
    bentukOlahan: "Jamu beras kencur, es beras kencur, es lilin beras kencur, kue beras kencur.",
  },
  {
    id: 5,
    gambar: "/images/temulawak.jpeg",
    tanaman: "Temulawak",
    namaLatin: "Curcuma zanthorrhiza",
    deskripsi: "tanaman berbatang semu dengan bunga eksotis berwarna putih kemerahan dan memiliki rimpang relatif besar dengan warna irisan rimpang kuning cerah. Tumbuhan obat ini tergolong dalam suku temu-temuan (Zingiberaceae).",
    manfaat: "Meningkatkan fungsi pencernaan, antikanker, temulawak membantu meningkatkan fungsi ginjal, meningkatkan metabolisme tubuh, membantu mengatasi mual",
    bentukOlahan: "Simplisia, pati, minuman instan, kue kering, jamu, dodol, dan permen jeli.",
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
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100">
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
      <div className="my-8 w-full px-[180px]">
        {filteredTanamanObat.map((tanaman) => (
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
        ))}
      </div>
      <Footer />
    </div>
  );
}
