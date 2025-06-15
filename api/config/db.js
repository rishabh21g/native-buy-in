import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({
  path: path.resolve(__dirname ,"../.env.local")
});

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    // console.log(process.env.MONGODB_URI)
    console.log(`Database connected with host ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error while connecting with database ${err}`);
    //  console.log(process.env.MONGODB_URI)
    process.exit(1)
  }
};

export default connectDB;
