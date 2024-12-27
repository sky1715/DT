const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

// Initialize MongoDB Connection
const connectToDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDB first.');
    }
    return db;
};

module.exports = { connectToDB, getDB };
