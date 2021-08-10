import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";

// reducer listens to actions
export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
