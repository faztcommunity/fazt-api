import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongo = new MongoMemoryServer();

export async function connect(): Promise<void> {
    const uri = await mongo.getConnectionString();
    const mongooseOptions = {
        useNewUrlParser: true,
    };

    await mongoose.connect(uri, mongooseOptions);
}

export async function closeDatabase(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
}

export async function clearDatabase(): Promise<void> {
    const collections = mongoose.connection.collections;
    const collectionsDeleted = Object.keys(collections).map((collection) => {
        return collections[collection].drop();
    });

    await Promise.all(collectionsDeleted);
}
