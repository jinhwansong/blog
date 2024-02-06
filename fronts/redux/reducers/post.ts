import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { baseAxios } from "utils/instance";
import * as I from "types";


interface PostInitialState {
  // 게시글 보내기
  postLoding: boolean;
  postDone: null;
  postError: null | undefined | string;
  // 게시글 불러오기
  postsLoding: boolean;
  postsDone: I.ICommon[];
  postsError: null | undefined | string;
  postDones: boolean;
  // 게시글 상세
  postDetailLoding: boolean;
  postDetailDone: I.ICommon | null;
  postDetailError: null | undefined | string;
  // 게시글 삭제
  deletePostLoding: boolean;
  deletePostDone: null;
  deletePostError: null | undefined | string;

  // 카테고리 목록
  categoreLoding: boolean;
  categoreDone: boolean;
  categoreError: null | undefined | string;
  categore: I.Categore[];

  // 좋아요
  likeLoading: boolean;
  likeDone: boolean;
  likeError: null | undefined | string;
  // 싫어요
  unlikeLoading: boolean;
  unlikeDone: boolean;
  unlikeError: null | undefined | string;
}
const initialState: PostInitialState = {
  // 게시글 보내기
  postLoding: false,
  postDone: null,
  postError: null,
  postDones: false,
  // 게시글 불러오기
  postsLoding: false,
  postsDone: [],
  postsError: null,
  // 게시글 상세
  postDetailLoding: false,
  postDetailDone: null,
  postDetailError: null,
  // 게시글 삭제
  deletePostLoding: false,
  deletePostDone: null,
  deletePostError: null,
  // 카테고리 목록
  categoreLoding: false,
  categoreDone: false,
  categoreError: null,
  categore: [],
  // 좋아요
  likeLoading: false,
  likeDone: false,
  likeError: null,
  // 싫어요
  unlikeLoading: false,
  unlikeDone: false,
  unlikeError: null,
};
// 게시글 보내기
export const post = createAsyncThunk("post",async(data:I.Post)=>{
    const response = await baseAxios.post("/post",data)
    return response
})
// 게시글 불러오기
export const posts = createAsyncThunk("posts",async()=>{
    const response = await baseAxios.get("/posts")
    return response
})
// 게시글 불러오기
export const postDetail = createAsyncThunk("postdetail",async(data:number)=>{
    const response = await baseAxios.get(`/posts/${data}`);
    return response
})
// 카테고리 목록
export const categore = createAsyncThunk("categore", async () => {
  const response = await baseAxios.get("/post/categore");
  return response;
});
// 좋아요
export const like = createAsyncThunk("like", async (data:number) => {
  const response = await baseAxios.patch(`/post/${data}/like`);
  return response;
});
// 싫어요
export const unlike = createAsyncThunk("unlike", async (data:number) => {
  const response = await baseAxios.delete(`/post/${data}/like`);
  return response;
});

// 게시물 삭제
export const deletePost = createAsyncThunk(
  "deletePost",
  async (data: number | undefined) => {
    const response = await baseAxios.delete(`/post/${data}`);
    return response;
  }
);

const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    postDones: (state) => {
      state.postDone = null;
    },
  },
  extraReducers: (builder) =>
    builder
      // 게시글 보내기
      .addCase(post.pending, (draft) => {
        draft.postLoding = true;
        draft.postDone = null;
        draft.postError = null;
      })
      .addCase(post.fulfilled, (draft, action) => {
        draft.postLoding = false;
        draft.postDone = action.payload.data;
      })
      .addCase(post.rejected, (draft, action) => {
        draft.postLoding = false;
        draft.postError = action.error.message;
      })
      // 게시글 받기
      .addCase(posts.pending, (draft) => {
        draft.postsLoding = true;
        draft.postsError = null;
      })
      .addCase(posts.fulfilled, (draft, action) => {
        draft.postsLoding = false;
        draft.postsDone = action.payload.data;
      })
      .addCase(posts.rejected, (draft, action) => {
        draft.postsLoding = false;
        draft.postsError = action.error.message;
      })
      // 게시글상세 받기
      .addCase(postDetail.pending, (draft) => {
        draft.postDetailLoding = true;
        draft.postDetailError = null;
      })
      .addCase(postDetail.fulfilled, (draft, action) => {
        draft.postDetailLoding = false;
        draft.postDetailDone = action.payload.data;
      })
      .addCase(postDetail.rejected, (draft, action) => {
        draft.postDetailLoding = false;
        draft.postDetailError = action.error.message;
      })
      // 게시글 삭제
      .addCase(deletePost.pending, (draft) => {
        draft.postDetailLoding = true;
        draft.postDetailError = null;
      })
      .addCase(deletePost.fulfilled, (draft, action) => {
        draft.postDetailLoding = false;
        draft.postDetailDone = action.payload.data;
      })
      .addCase(deletePost.rejected, (draft, action) => {
        draft.postDetailLoding = false;
        draft.postDetailError = action.error.message;
      })
      // 카테고리 목록
      .addCase(categore.pending, (draft) => {
        draft.categoreLoding = true;
        draft.categoreDone = false;
        draft.categoreError = null;
      })
      .addCase(categore.fulfilled, (draft, action) => {
        draft.categoreLoding = false;
        draft.categoreDone = true;
        draft.categore = action.payload.data;
      })
      .addCase(categore.rejected, (draft, action) => {
        draft.categoreLoding = false;
        draft.categoreError = action.error.message;
      })

      // 좋아요
      .addCase(like.pending, (draft) => {
        draft.likeLoading = true;
        draft.likeDone = false;
        draft.likeError = null;
      })
      .addCase(like.fulfilled, (draft, action) => {
        const post = draft.postsDone.find(
          (v) => v.id === action.payload.data.PostId
        );
        post?.Liked.push({ id: action.payload.data.UserId });
        draft.likeLoading = false;
        draft.likeDone = true;
      })
      .addCase(like.rejected, (draft, action) => {
        draft.likeLoading = false;
        draft.likeError = action.error.message;
      })
      // 싫어요
      .addCase(unlike.pending, (draft) => {
        draft.unlikeLoading = true;
        draft.unlikeDone = false;
        draft.unlikeError = null;
      })
      .addCase(unlike.fulfilled, (draft, action) => {
        const post = draft.postsDone.find(
          (v) => v.id === action.payload.data.PostId
        );
        if (post) {
          post.Liked = post?.Liked.filter(
            (v) => v.id !== action.payload.data.UserId
          );
        }

        draft.unlikeLoading = false;
        draft.unlikeDone = true;
      })
      .addCase(unlike.rejected, (draft, action) => {
        draft.unlikeLoading = false;
        draft.unlikeError = action.error.message;
      }),
});
export const { postDones } = postReducer.actions;
export default postReducer;