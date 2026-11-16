import mongoose from "mongoose";

const globalForMongoose = globalThis as unknown as {
  mongooseConn?: Promise<typeof mongoose>;
};

export function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!globalForMongoose.mongooseConn) {
    globalForMongoose.mongooseConn = mongoose.connect(uri).catch((error: unknown) => {
      globalForMongoose.mongooseConn = undefined;
      throw error;
    });
  }
  return globalForMongoose.mongooseConn;
}
