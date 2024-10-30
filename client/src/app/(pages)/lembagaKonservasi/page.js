// Updated component to match the provided design with no errors

'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function LembagaKonservasi() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const programs = [
    { title: 'Konservasi Tanaman Obat dan Keluarga', image: '/images/rapat.png' },
    { title: 'Pengembangan Produk Olahan TOGA', image: '/images/rapat.png' },
    { title: 'Pengelolaan Kafe Jamu', image: '/images/djampi.png' },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % programs.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 overflow-hidden">
      <Navbar />
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Group 27.png')" }}
      >
        <h1 className="text-3xl font-bold text-white text-center pt-36">
          Lembaga Konservasi
        </h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
          Program penanaman tanaman obat keluarga di Dusun Banteran dan Desa Tanjung yang diinisiasi oleh BEM KM UGM 2024
        </p>
      </div>
      <div className="w-full px-6 md:px-20 lg:px-44 mb-20">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 mt-4">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <p className="text-lg mb-4 mt-14 md:mt-28">
              Lembaga konservasi TOGA merupakan sebuah wadah yang ditujukan untuk melestarikan dan mempromosikan TOGA melalui pembentukan komunitas. Lembaga konservasi TOGA akan melakukan pengelolaan terhadap bibit TOGA dari struktur lokal, seperti jahe, kencur, kunyit, dan serai. Pengelolaan bibit TOGA merupakan bentuk tanggung jawab dari struktur keanggotaan lembaga konservasi TOGA. Struktur keanggotaan lembaga konservasi TOGA terdiri dari pelaku Usaha Mikro Kecil dan Menengah (UMKM), ibu-ibu PKK, dan petani jamu.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/images/rapat.png"
              alt="Meeting"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Struktur Lembaga</h2>
        <Tabs defaultValue="rt01" className="mb-12">
          <TabsList className="flex justify-center mb-4">
            <TabsTrigger value="rt01" className="px-4 py-2">RT 01</TabsTrigger>
            <TabsTrigger value="rt04" className="px-4 py-2">RT 04</TabsTrigger>
          </TabsList>
          <TabsContent value="rt01">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Struktur Organisasi RT 01</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Jabatan</th>
                    <th className="border-b p-2">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b p-2">Penasehat</td>
                    <td className="border-b p-2">Saptono Budi Samodra (Ketua Dsa Wisata Tanjung), Widadi (Ketua RW 25)</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Pembina</td>
                    <td className="border-b p-2">Catur Suharna (Kepala Dusun Banteran)</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Ketua</td>
                    <td className="border-b p-2">Subardjo</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Wakil</td>
                    <td className="border-b p-2">Bitri Napitupulu</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Bendahara</td>
                    <td className="border-b p-2">Eni Winarni</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Sekretaris</td>
                    <td className="border-b p-2">Supriharyati</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Budidaya</td>
                    <td className="border-b p-2">Sri Sukarti, Wahyuni, Yulice adruani, Muryanti</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Jaringan</td>
                    <td className="border-b p-2">Dwi Rahayu, Aik Sukmara, Hartanti, Beti Tanjung Sari</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Media</td>
                    <td className="border-b p-2">Putri Eka Syifa, Anita Rasyid, Salsabilla Ananda Nuraisyah</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Pengembangan</td>
                    <td className="border-b p-2">Sulastri, Sarmi, Neni Purwanti</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="rt04">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Struktur Organisasi RT 04</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Jabatan</th>
                    <th className="border-b p-2">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b p-2">Pelindung</td>
                    <td className="border-b p-2">Saptono Budi Samodra (Ketua Desa Wisata Tanjung), Yunianto Wibawa (Ketua RT04)</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Pembina</td>
                    <td className="border-b p-2">Catur Suharna (Kepala Dusun Banteran)</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Ketua</td>
                    <td className="border-b p-2">Listyanto</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Wakil Ketua</td>
                    <td className="border-b p-2">Gilang Fajar Dwi Cahya Trisna Wijaya</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Bendahara</td>
                    <td className="border-b p-2">Sumar Ismiati</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Sekretaris</td>
                    <td className="border-b p-2">Lintang Esma Rochmawati</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Budidaya</td>
                    <td className="border-b p-2">Singgih, Riski Amalia, Tunjiah, Remanda Utami</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Jaringan</td>
                    <td className="border-b p-2">Sujiyanto, Samiasih, Rosidah, Yunarni</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Media</td>
                    <td className="border-b p-2">Ummu Azizah, Bayu Hendarto, Eliza Magfira</td>
                  </tr>
                  <tr>
                    <td className="border-b p-2">Pengembangan</td>
                    <td className="border-b p-2">Winarno, Zakiyah Darajat, Estri Utami</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <h2 className="text-2xl font-bold mb-4">Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div key={index} className="relative w-full h-64 overflow-hidden rounded-lg">
              <Image
                src={program.image}
                alt={program.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-center">
                <h3 className="text-lg font-semibold">{program.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
