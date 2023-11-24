import mongoose from 'mongoose'

const connection = {}
async function connectDB() {
    if (connection.isConnected) {
        return
    }
    const db = await mongoose.connect(process.env.MONGODB_URL)
    connection.isConnected = db.connections[0].readyState
}

export default connectDB;
