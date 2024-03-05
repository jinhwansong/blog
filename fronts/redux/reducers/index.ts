import { combineReducers } from "redux";
import UserReducer, { UserInitialState } from "./user";
import PostReducer, { PostInitialState } from "./post";
import { AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IRootReducer {
  user: UserInitialState;
  post: PostInitialState;
}

// rootReducer 확장
const rootReducer = (state: IRootReducer, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload
    default: {
      const combineReducer = combineReducers({
        user: UserReducer.reducer,
        post: PostReducer.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;