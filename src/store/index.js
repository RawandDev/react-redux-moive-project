import { configureStore } from "@reduxjs/toolkit";
import tmdbReducer from "./reducers/tmdbSlice";
import userReducer from "./reducers/authSlice";
import bookmarkReducer from "./reducers/bookmarkSlice";

const store = configureStore({
  reducer: {
    tmdb: tmdbReducer,
    user: userReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;
