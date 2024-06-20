import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axiosBase";

export const getPosts = createAsyncThunk("posts/fetchPostsData", async () => {
  const { data } = await axios.get("/post");
  return data.posts;
});

type State = {
  posts: any;
  searchPosts: any;
};
const initialState: State = {
  posts: [],
  searchPosts: [],
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeItem(state, action) {
      state.posts = state.posts.filter(
        (item: any) => item._id !== action.payload,
      );
    },
    searchItem: (state, action) => {
      state.posts = state.searchPosts.filter((item: any) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.searchPosts = action.payload;
    });
  },
});

export const postReducer = postSlice.reducer;
export const { removeItem, searchItem } = postSlice.actions;
