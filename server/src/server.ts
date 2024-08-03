// src/server.ts
import express from "express";
import mongoose from "mongoose";
import cryptoRoutes from "./routes/cryptoRoutes";
import { startCryptoPolling } from "./services/cryptoService";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your Vite frontend
}));


const PORT: number = parseInt(process.env.PORT!, 10);
const MONGO_URI: string = process.env.MONGO_URI!;


app.use(express.json());

app.use("/api", cryptoRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    startCryptoPolling();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
