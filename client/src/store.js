import {configureStore} from "@reduxjs/toolkit";
import aiSlice from "./AiSlice";

export default configureStore({
    reducer: {
        ai : aiSlice
    }
})
