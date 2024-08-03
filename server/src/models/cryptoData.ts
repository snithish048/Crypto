import mongoose, { Schema, Document } from 'mongoose';

interface ICryptoData extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

const CryptoDataSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ICryptoData>('CryptoData', CryptoDataSchema);