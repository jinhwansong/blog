import { combineReducers } from "redux";
import UserReducer from "./user";
import PostReducer from "./post";

const rootReducer = combineReducers({
  user: UserReducer.reducer,
  post: PostReducer.reducer,
});

export default rootReducer;