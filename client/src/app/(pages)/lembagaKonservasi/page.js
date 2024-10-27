'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function LembagaKonservasi() {

  const [currentSlide, setCurrentSlide] = useState(0)
  const programs = [
    { title: "Konservasi Tanaman Obat dan Keluarga", image: "/placeholder.svg?height=200&width=300" },
    { title: "Pengembangan Produk Olahan TOGA", image: "/placeholder.svg?height=200&width=300" },
    { title: "Pengelolaan Kafe Jamu", image: "/placeholder.svg?height=200&width=300" },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % programs.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length)
    
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 overflow-hidden">
        <Navbar />
        <div
          className="w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Group 27.png')" }}
        >
          <h1 className="text-3xl font-bold text-white text-center pt-36">
            LembagaKonservasi
          </h1>
          <p className="text-lg text-white text-center pt-3 pb-20">
            Program penanaman tanaman obat keluarga di Dusun Banteran dan Desa
            Tanjung yang diinisiasi oleh BEM KM UGM 2024
          </p>
        </div>
        <div className="w-full px-[180px]">
          <div className="flex space-x-3 mt-4">



    <div className="container mx-auto px-4 py-8">


      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-4">
            Lembaga konservasi TOGA merupakan sebuah wadah yang ditujukan untuk melestarikan dan mempromosikan TOGA melalui pembentukan komunitas. Lembaga konservasi TOGA akan melakukan pengelolaan terhadap bibit TOGA dari struktur lokal, seperti jahe, kencur, kunyit, dan serai. Pengelolaan bibit TOGA merupakan bentuk tanggung jawab dari struktur keanggotaan lembaga konservasi TOGA. Struktur keanggotaan lembaga konservasi TOGA terdiri dari pelaku Usaha Mikro Kecil dan Menengah (UMKM), ibu-ibu PKK, dan petani jamu.
          </p>
          <div className="flex justify-center">
            <ChevronLeft className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
        <Image src="/placeholder.svg?height=300&width=500" alt="Meeting" width={500} height={300} className="rounded-lg" />
      </div>

      <h2 className="text-2xl font-bold mb-4">Struktur Lembaga</h2>
      <Tabs defaultValue="rt01" className="mb-12">
        <TabsList>
          <TabsTrigger value="rt01">RT 01</TabsTrigger>
          <TabsTrigger value="rt04">RT 04</TabsTrigger>
        </TabsList>
        <TabsContent value="rt01">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Struktur Organisasi RT 01</h3>
            {/* Add organizational structure for RT 01 here */}
          </div>
        </TabsContent>
        <TabsContent value="rt04">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Struktur Organisasi RT 04</h3>
            {/* Add organizational structure for RT 04 here */}
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-bold mb-4">Program</h2>
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevSlide} className="p-2 bg-gray-200 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="p-2 bg-gray-200 rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {programs.map((program, index) => (
              <Card key={index} className="w-full flex-shrink-0">
                <CardContent className="p-4">
                  <Image src={program.image} alt={program.title} width={300} height={200} className="rounded-lg mb-4" />
                  <h3 className="text-lg font-semibold">{program.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  

          </div>
        </div>
        <div className="my-8 w-full px-[180px]">
          
        </div>
        <Footer />
      </div>
    );
  }
  