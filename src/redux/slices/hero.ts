import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axiosBase";

export const getHero = createAsyncThunk("posts/heroData", async () => {
  const { data } = await axios.get("/hero");
  return data.heroes;
});

type State = {
  heroes: any;
  searchHero: any;
};
const initialState: State = {
  heroes: [],
  searchHero: [],
};
const heroSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeHero(state, action) {
      state.heroes = state.heroes.filter(
        (item: any) => item._id !== action.payload,
      );
    },
    searchHero: (state, action) => {
      state.heroes = state.searchHero.filter((item: any) =>
        item.fullName.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHero.fulfilled, (state, action) => {
      state.heroes = action.payload;
      state.searchHero = action.payload;
    });
  },
});

export const heroReducer = heroSlice.reducer;
export const { removeHero, searchHero } = heroSlice.actions;
