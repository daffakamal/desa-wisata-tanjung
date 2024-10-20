import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Gallery() {
  const plants = [
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
    { name: "Menu xxxx", imageUrl: "/images/plant1.png" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 relative">
      <Navbar />
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Group 27.png')" }}
      >
        <h1 className="text-3xl font-bold text-white text-center pt-36">
          Cafe
        </h1>
        <p className="text-lg text-white text-center pt-3 pb-20">
          Program penanaman tanaman obat keluarga di Dusun Banteran dan Desa
          Tanjung yang diinisiasi oleh BEM KM UGM 2024
        </p>
      </div>
      <div className="w-full px-[180px]">
        <p className="mt-8 text-xl font-bold text-black">Daftar Menu</p>
        <div className="grid grid-cols-4 gap-8 mt-4 mb-8">
          {plants.map((plant, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-center text-lg font-semibold text-black">
                  {plant.name}
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
