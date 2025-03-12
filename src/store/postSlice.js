import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: null,
  },
  reducers: {
    getPosts: (state, action) => {
      if (state.posts === null) {
        state.posts = action.payload;
      } else {
        state.posts = [...state.posts, action.payload];
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
  },
});

export const { getPosts, deletePost } = postSlice.actions;

export default postSlice.reducer;
