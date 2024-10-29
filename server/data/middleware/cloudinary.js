const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'djno49igv',
    api_key: process.env.CLOUDINARY_API_KEY || '269294678898637',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'v-H4uqpNjoUeAYM7Cqh4_e9lgiA'
});

// Fungsi upload file ke Cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'tanaman-obat',
            use_filename: true,
        });
        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        throw new Error('Error uploading to Cloudinary');
    }
};

// Fungsi hapus file dari Cloudinary
const deleteFromCloudinary = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};

// Ekspor fungsi agar dapat diakses oleh script lain
module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};