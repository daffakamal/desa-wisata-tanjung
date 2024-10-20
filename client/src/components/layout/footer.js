import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#242424] text-white py-10 px-8 md:px-32">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 max-w-[520px]">
          <h2 className="text-2xl font-bold">Desa Wisata Tanjung</h2>
          <p className="mt-3">
            A stunning tourism village with many rich local cultures and
            potentials. Feel the unique experience and excitement by exploring Tanjung Tourism Village.
          </p>
          <p className="mt-7 text-sm">Alamat: Desa Tanjung, Donoharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581</p>
        </div>
        <div className="text-center md:text-left">
          <p className="font-medium text-center">Didukung oleh:</p>
          <div className="flex mt-3 space-x-9">
            <Link href="https://bemkm.ugm.ac.id" rel="noopener noreferrer" target="_blank">
              <img
                src="/images/bem-km.png"
                alt="BEM KM UGM 2024"
                className="w-28 cursor-pointer"
              />
            </Link>
            <Link href="https://ugm.ac.id" rel="noopener noreferrer" target="_blank">
              <img
                src="/images/ugm.png"
                alt="Universitas Gadjah Mada"
                className="w-32 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};