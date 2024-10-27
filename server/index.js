const express = require('express');
const { connectToMongDB } = require('./utils/connect');
const cors = require('cors');

const umkmRoutes = require('./data/routes/umkmRoutes');
const tanamanObatRoutes = require('./data/routes/tanamanObatRoutes');
const kesenianRoutes = require('./data/routes/kesenianRoutes');
const galleryRoutes = require('./data/routes/galleryRoutes');
const cafeRoutes = require('./data/routes/cafeRoutes');
const authRoutes = require('./data/routes/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToMongDB("mongodb+srv://h9p9fhkfhs:rk8vQnCBbLF7LK4t@abdesdb.wamj5.mongodb.net/?retryWrites=true&w=majority&appName=abdesdb")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

/////////////// Function for testing ///////////////////

app.use('/in/status', (req, res) => {
    res.status(200).json({"success":"api deployed"})
})

/////////////////////////////////////////////////////////

app.use('/in/umkm', umkmRoutes);
app.use('/in/tanaman-obat', tanamanObatRoutes);
app.use('/in/kesenian', kesenianRoutes);
app.use('/in/gallery', galleryRoutes);
app.use('/in/cafe', cafeRoutes);

app.use('/in/auth', authRoutes);
// app.use('/in/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server start at PORT: ${PORT}`);
});