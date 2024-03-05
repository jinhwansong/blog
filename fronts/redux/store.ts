import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducer from "./reducers";



const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({ serializableCheck: false }),
    
  });


export default createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = AppStore["dispatch"];