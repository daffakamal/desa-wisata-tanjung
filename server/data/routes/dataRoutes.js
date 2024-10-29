const Cafe = require('../models/cafeModel');
const Gallery = require('../models/galleryModel');
const Kesenian = require('../models/kesenianModel');
const TanamanObat = require('../models/tanamanObatModel');
const Umkm = require('../models/umkmModel');

const getData = async (req, res) => {
    try {
        // Ambil data dari setiap koleksi
        const cafes = await Cafe.find().select("menu gambar harga");
        const galleries = await Gallery.find().select("gambar tanaman deskripsi");
        const kesenian = await Kesenian.find().select("gambar kesenian deskripsi");
        const tanamanObat = await TanamanObat.find().select("tanaman namaLatin deskripsi manfaat bentukOlahan gambar");
        const umkm = await Umkm.find().select("gambar umkm usaha alamat nomor kategori");

        // Strukturkan data sesuai format yang diinginkan
        const responseData = {
            cafe: cafes.map((item) => ({
                id: item._id,
                title: item.menu,
                image: item.gambar,
                price: item.harga,
            })),
            gallery: galleries.map((item) => ({
                id: item._id,
                title: item.tanaman,
                image: item.gambar,
                description: item.deskripsi,
            })),
            kesenian: kesenian.map((item) => ({
                id: item._id,
                title: item.kesenian,
                image: item.gambar,
                description: item.deskripsi,
            })),
            tanamanObat: tanamanObat.map((item) => ({
                id: item._id,
                title: item.tanaman,
                latinName: item.namaLatin,
                description: item.deskripsi,
                benefits: item.manfaat,
                preparation: item.bentukOlahan,
                image: item.gambar,
            })),
            umkm: umkm.map((item) => ({
                id: item._id,
                title: item.umkm,
                image: item.gambar,
                business: item.usaha,
                address: item.alamat,
                contact: item.nomor,
                category: item.kategori,
            })),
        };

        // Kirim respons dengan data yang telah terstruktur
        res.json(responseData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getData };
