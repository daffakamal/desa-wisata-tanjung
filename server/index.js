const express = require('express');
const { connectToMongDB } = require('./utils/connect');
const cors = require('cors');

const umkmRoutes = require('./data/routes/umkmRoutes');
const tanamanObatRoutes = require('./data/routes/tanamanObatRoutes');
const kesenianRoutes = require('./data/routes/kesenianRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectToMongDB("mongodb://h9p9fhkfhs:9Vc8bI9rN7dJK3wF@h9p9fhkfhs/?ssl=true&replicaSet=atlas-9i3hpb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Abdes")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

/////////////// Function for testing ///////////////////

app.use('/in/status', (req, res) => {
    res.status(200).json({"success":"api deployed"})
})

/////////////////////////////////////////////////////////

app.use('/umkm', umkmRoutes);
app.use('/tanaman-obat', tanamanObatRoutes);
app.use('/kesenian', kesenianRoutes);

app.listen(PORT, () => {
    console.log(`Server start at PORT: ${PORT}`);
});