// import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";
// import { baseAxios } from "utlis/instance";


// interface PostState {

// }
// const initialState: PostState = {

// }

// const postReducer = createSlice({
//   name: "post",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) =>
//     builder.addCase(HYDRATE, (state, action: PayloadAction) => ({
//       ...state,
//       ...action.payload.post,
//     })),
// });