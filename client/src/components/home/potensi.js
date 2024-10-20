'use client'
import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const potensiData = [
  {
    title: "UMKM",
    description:
      "Lihat 20 lebih potensi UMKM kuliner dan non-kuliner di Dusun Banteran",
    link: "/umkm",
    imageUrl: "/images/umkm.png",
  },
  {
    title: "Agro",
    description:
      "Temukan berbagai potensi tanaman obat di Dusun Banteran",
    link: "/toga",
    imageUrl: "/images/agro.png",
  },
  {
    title: "Kesenian",
    description:
      "Jelajahi kekayaan seni dan budaya di Dusun Banteran yang unik dan menarik",
    link: "/kesenian",
    imageUrl: "/images/kesenian.png",
  },
];

export default function Potensi() {
  return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div
          id="potensi"
          className="w-full flex flex-col items-center justify-center bg-white pt-12 pb-20 px-4 sm:px-6 md:px-8 lg:px-20"
        >
          <h2 className="leading-tight text-2xl sm:text-[28px] font-bold text-black text-center pb-10">
            Berbagai Potensi
          </h2>
          
          <Carousel   opts={{
                        align: "start",
                        loop: true,
                      }}
                      plugins={[
                        Autoplay({
                          delay: 2000,
                        }),
                      ]}
                      className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
            <CarouselContent className="-ml-2 md:-ml-4">
              {potensiData.map((potensi, index) => (
                <CarouselItem key={index} className="md:basis-1/3 pl-2 md:pl-4 w-full sm:w-1/2 lg:w-1/3">
                  <Card className="relative bg-cover bg-center h-[290px] overflow-hidden rounded-2xl">
                    <CardContent className="p-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${potensi.imageUrl})` }}
                      />
                      <div className="absolute inset-0 max-w-md h-full flex flex-col justify-end gap-4 p-6 sm:p-8">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {potensi.title}
                          </h3>
                          <p className="text-white text-left mt-2 text-sm sm:text-base">
                            {potensi.description}
                          </p>
                        </div>
                        <Link href={potensi.link}>
                          <button className="mt-4 px-4 py-2 w-full sm:w-36 text-center bg-blue-500 text-white rounded-2xl text-sm sm:text-base">
                            Lihat {potensi.title}
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
  )
}