const mongoose = require('mongoose')
const db = require('./default')

const connectDB = async() => {
    try{
        await mongoose.connect(db.mongoURI, {
            useNewUrlParser: true
        })
        console.log('MongoDB connected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB