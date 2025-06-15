import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletePost } from "../src/service/post";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  posts: [],
};

export const fetchPosts = createAsyncThunk("posts/getPosts", async (func) => {
  return func();
});

export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (id) => {
    await deletePost(id);
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  //     addTodo: (state, action) => {
  //       state.push({
  //         id: state.length + 1,
  //         text: action.payload,
  //         completed: false,
  //       });
  //     },
  //     deleteTodo: (state, action) => {
  //       const filteredTodo = state.filter((ele) => ele.id !== action.payload);
  //       return filteredTodo;
  //     },
  //     toggleTodo: (state, action) => {
  //       console.log("state, action", state, action);
  //       const updatedTodo = state.map((ele) => {
  //         if (ele.id === action.payload) {
  //           return {
  //             ...ele,
  //             completed: !ele.completed,
  //           };
  //         } else {
  //           return ele;
  //         }
  //       });
  //       return updatedTodo;
  //     },
  //   },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log("action", action);
        // Add user to the state array
        (state.isLoading = false),
          (state.isError = false),
          (state.posts = action.payload.data.data);
      })
      .addCase(fetchPosts.pending, (state) => {
        // Add user to the state array
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // Add user to the state array
        (state.isLoading = false), (state.isError = action.payload);
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        // Add user to the state array
        (state.isLoading = false),
          (state.isError = false),
          (state.posts = state.posts.filter(
            (post) => post._id !== action.payload
          ));
      });
  },
});

// export const { addTodo, deleteTodo, toggleTodo } = postsSlice.actions;
export default postsSlice.reducer;
