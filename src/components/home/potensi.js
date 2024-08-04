import Link from "next/link";

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
    <div className="h-full w-full flex flex-col items-center justify-start">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div
          id="potensi"
          className="w-full flex flex-col items-center justify-center bg-white pt-12 pb-20 px-20"
        >
          <h2 className="leading-tight text-[28px] font-bold text-black text-center pb-10">
            Berbagai Potensi
          </h2>
          <div className="flex items-center justify-between space-x-8">
            {potensiData.map((potensi, index) => (
              <div
                key={index}
                className="relative bg-cover bg-center w-[300px] h-[290px] px-8 pt-7 pb-8 rounded-2xl"
                style={{ backgroundImage: `url(${potensi.imageUrl})` }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {potensi.title}
                    </h3>
                    <p className="text-white text-left mt-4">
                      {potensi.description}
                    </p>
                  </div>
                  <Link href={potensi.link}>
                    <button className="mt-4 px-4 py-2 w-36 text-center bg-blue-500 text-white rounded-2xl">
                      Lihat {potensi.title}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
