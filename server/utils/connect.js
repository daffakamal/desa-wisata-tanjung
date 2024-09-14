const mongoose = require('mongoose')

const connectToMongDB = (url) => {
    return mongoose.connect(url)
}

module.exports = {
    connectToMongDB,
}