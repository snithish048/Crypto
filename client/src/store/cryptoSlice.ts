// src/store/cryptoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CryptoData {
  _id: string;
  symbol: string;
  price: number;
  timestamp: string;
}

export interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  selectedSymbol: string;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  selectedSymbol: "BITCOIN",
};

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (symbol: string) => {
    const response = await axios.get(
      `http://localhost:4000/api/crypto/${symbol}`
    );
    // console.log("Fetched Data:", response.data); // Add this line
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCryptoData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

export const { setSelectedSymbol } = cryptoSlice.actions;
export default cryptoSlice.reducer;
