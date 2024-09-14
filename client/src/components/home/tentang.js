export default function Tentang() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div id="tentang" className="w-full flex flex-col items-center justify-center bg-[#242424] pt-16 pb-20 px-20">
          <h2 className="leading-tight text-[28px] font-bold text-white text-center pb-5">
            Tentang Desa Wisata Tanjung
          </h2>
          <p className="text-white text-center text-[18px] max-w-[1100px]">
            Desa Wisata Tanjung terletak di Kelurahan Donoharjo, Kecamatan
            Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Desa wisata
            ini dikenal dengan keindahan alam pertaniannya, upaya pelestarian
            lingkungan, pertanian, dan kesenian.
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-[#3A3A3A] pt-16 pb-20 px-20">
          <h2 className="leading-tight text-[28px] max-w-[675px] font-bold text-white text-center pb-5">
            Tentang Dusun Banteran
          </h2>
          <p className="text-white text-center text-[18px] max-w-[1100px]">
            Dusun Banteran adalah salah satu dusun yang berada di Kelurahan
            Donoharjo, Ngaglik, Sleman. Dusun ini memiliki potensi desa wisata,
            yaitu Desa Wisata Tanjung. Selain itu, terdapat potensi UMKM, agro,
            dan kesenian yang juga tidak kalah menarik.
          </p>
        </div>
      </div>
    </div>
  );
}
