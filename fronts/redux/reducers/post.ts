import { createSlice,createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { baseAxios, imageAxios } from "utils/instance";
import * as I from "types";
import { HYDRATE } from "next-redux-wrapper";


export interface PostInitialState {
  // 게시글 보내기
  postLoding: boolean;
  postDone: boolean;
  postError: null | undefined | string;
  // 게시글 불러오기
  postsLoding: boolean;
  postsDone: I.ICommons;
  postsError: null | undefined | string;
  // 해시태그 불러오기
  hashtagLoding: boolean;
  hashtagDone: I.ICommons;
  hashtagError: null | undefined | string;
  // 검색 불러오기
  searchLoding: boolean;
  searchDone: I.ICommons;
  searchError: null | undefined | string;
  // 게시글 상세
  postDetailLoding: boolean;
  postDetailDone: I.ICommon | null;
  postDetailError: null | undefined | string;
  // 게시글 삭제
  deletePostLoding: boolean;
  deletePostDone: null;
  deletePostError: null | undefined | string;
  // 게시글 수정
  postModifyLoding: boolean;
  postModifyDone: boolean;
  postModifyError: null | undefined | string;
  // 이미지 업로드
  imagePaths: string[];
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: null | undefined | string;

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

  // 최근게시물
  recentPostLoading: boolean;
  recentPostDone: I.RecentPost[];
  recentPostError: null | undefined | string;
}
const initialState: PostInitialState = {
  // 게시글 보내기
  postLoding: false,
  postDone: false,
  postError: null,
  // 게시글 불러오기
  postsLoding: false,
  postsDone: {
    count: 0,
    posts: [],
  },
  postsError: null,

  // 해시태그 불러오기
  hashtagLoding: false,
  hashtagDone: {
    count: 0,
    posts: [],
  },
  hashtagError: null,
  // 검색 불러오기
  searchLoding: false,
  searchDone: {
    count: 0,
    posts: [],
  },
  searchError: null,

  // 게시글 상세
  postDetailLoding: false,
  postDetailDone: null,
  postDetailError: null,
  // 게시글 삭제
  deletePostLoding: false,
  deletePostDone: null,
  deletePostError: null,
  // 게시글 수정
  postModifyLoding: false,
  postModifyDone: false,
  postModifyError: null,
  // 카테고리 목록
  categoreLoding: false,
  categoreDone: false,
  categoreError: null,
  categore: [],
  // 이미지 업로드
  imagePaths: [],
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  // 좋아요
  likeLoading: false,
  likeDone: false,
  likeError: null,
  // 싫어요
  unlikeLoading: false,
  unlikeDone: false,
  unlikeError: null,

  // 최근게시물
  recentPostLoading: false,
  recentPostDone: [],
  recentPostError: null,
};
// 게시글 보내기
export const post = createAsyncThunk("post", async (data: I.Post) => {
  const response = await baseAxios.post("/post", data);
  return response;
});
// 게시글 불러오기
export const posts = createAsyncThunk("posts",async(page:number)=>{
    const response = await baseAxios.get(`/posts?page=${page}`);
    return response
})
// 해시태그 불러오기
export const hashtags = createAsyncThunk("hashtag", async (data: I.Hashtag) => {
  const response = await baseAxios.get(
    `/hashtag/${data.hashtag}?page=${data.page}`
  );
  return response;
});
// 검색 불러오기
export const searchs = createAsyncThunk("search", async (data: I.Search) => {
  const response = await baseAxios.get(
    `/search/${data.search}?page=${data.page}`
  );
  return response;
});



// 게시글 불러오기
export const postDetail = createAsyncThunk("postdetail",async(data:number)=>{
    const response = await baseAxios.get(`/posts/${Number(data)}`);
    return response
})

// 게시글 수정
export const postModify = createAsyncThunk("postModify", async (data: I.Modify) => {
  const response = await baseAxios.patch(`/post/${data.id}`, data);
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
// 이미지 업로드
export const imageUpload = createAsyncThunk("imageUpload", async (data: FormData) => {
  const response = await imageAxios.post(`/post/images`, data);
  return response;
});


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
// 최근게시물
export const recentPost = createAsyncThunk(
  "posts/recentPost",
  async (data: number) => {
    const response = await baseAxios.get(`/posts/recentPost?time=${data}`);
    return response;
  }
);


const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    postDones: (state) => {
      state.postDone = false;
    },
    postModifys: (state) => {
      state.postModifyDone = false;
    },
  },
  extraReducers: (builder) =>
    builder
      // ssr 하이드레이트
      .addCase(HYDRATE, (state, action: AnyAction) => ({
        ...state,
        ...action.payload.post,
      }))
      // 게시글 보내기
      .addCase(post.pending, (draft) => {
        draft.postLoding = true;
        draft.postDone = false;
        draft.postError = null;
      })
      .addCase(post.fulfilled, (draft) => {
        draft.postLoding = false;
        draft.postDone = true;
      })
      .addCase(post.rejected, (draft, action) => {
        draft.postLoding = false;
        draft.postError = action.error.message;
      })
      // 게시글 수정
      .addCase(postModify.pending, (draft) => {
        draft.postModifyLoding = true;
        draft.postModifyDone = false;
        draft.postModifyError = null;
      })
      .addCase(postModify.fulfilled, (draft) => {
        draft.postModifyLoding = false;
        draft.postModifyDone = true;
      })
      .addCase(postModify.rejected, (draft, action) => {
        draft.postModifyLoding = false;
        draft.postModifyError = action.error.message;
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
      // 해시태그 검색한 게시물 받기
      .addCase(hashtags.pending, (draft) => {
        draft.hashtagLoding = true;
        draft.hashtagError = null;
      })
      .addCase(hashtags.fulfilled, (draft, action) => {
        draft.hashtagLoding = false;
        draft.hashtagDone = action.payload.data;
      })
      .addCase(hashtags.rejected, (draft, action) => {
        draft.hashtagLoding = false;
        draft.hashtagError = action.error.message;
      })
      // 검색한 게시물 받기
      .addCase(searchs.pending, (draft) => {
        draft.searchLoding = true;
        draft.searchError = null;
      })
      .addCase(searchs.fulfilled, (draft, action) => {
        draft.searchLoding = false;
        draft.searchDone = action.payload.data;
      })
      .addCase(searchs.rejected, (draft, action) => {
        draft.searchLoding = false;
        draft.searchError = action.error.message;
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
      // 게시글 이미지 업로드
      .addCase(imageUpload.pending, (draft) => {
        draft.uploadImagesLoading = true;
        draft.uploadImagesError = null;
      })
      .addCase(imageUpload.fulfilled, (draft, action) => {
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.imagePaths = action.payload.data;
      })
      .addCase(imageUpload.rejected, (draft, action) => {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error.message;
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
        const post = draft.postsDone.posts.find(
          (v) => v.id === action.payload.data.PostId
        );
        if (post) {
          post.like = action.payload.data.like;
          post.count = post.count + 1;
        }
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
        const post = draft.postsDone.posts.find(
          (v) => v.id === action.payload.data.PostId
        );
        if (post) {
          post.like = action.payload.data.like;
          post.count = post.count - 1;
        }
        draft.unlikeLoading = false;
        draft.unlikeDone = true;
      })
      .addCase(unlike.rejected, (draft, action) => {
        draft.unlikeLoading = false;
        draft.unlikeError = action.error.message;
      })
      // 최근게시물
      .addCase(recentPost.pending, (draft) => {
        draft.recentPostLoading = true;
        draft.recentPostError = null;
      })
      .addCase(recentPost.fulfilled, (draft, action) => {
        draft.recentPostLoading = false;
        draft.recentPostDone = action.payload.data;
      })
      .addCase(recentPost.rejected, (draft, action) => {
        draft.recentPostLoading = false;
        draft.recentPostError = action.error.message;
      }),
});
export const { postDones, postModifys } = postReducer.actions;
export default postReducer;