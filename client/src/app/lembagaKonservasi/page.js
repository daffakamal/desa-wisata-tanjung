import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function lembagaKonservasi() {
    
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100">
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
          <p className="mt-8 text-xl font-bold text-black">Daftar Tanaman Obat</p>
          <div className="flex space-x-3 mt-4">


          </div>
        </div>
        <div className="my-8 w-full px-[180px]">
          
        </div>
        <Footer />
      </div>
    );
  }
  