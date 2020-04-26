import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/authReducer";

export default configureStore({
  reducer: { auth },
});
