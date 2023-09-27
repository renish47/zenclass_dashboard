import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./features/studentSlice";
import appSlice from "./features/appSlice";

const store = configureStore({
    reducer: {
        student: studentSlice.reducer,
        app: appSlice.reducer
    }
});

export const selectStudent = state => state.student
export const selectApp = state => state.app

export default store;

