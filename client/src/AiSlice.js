import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import _ from 'lodash';

export const aiSlice = createSlice({
    name: 'ai',
    initialState: {isSyncing: false, response: "", itemsList: []},
    reducers: {
        toggleIsSync: (state, action) => {
            state.isSyncing = action.payload;
        },
        setResponse: (state, action) =>{
            state.response = action.payload;
        },
        saveResponse: (state, action) => {
            state.itemsList.push(action.payload);
            localStorage.setItem("ai-local-store", JSON.stringify(state.itemsList));
        },
        loadStateFromLocalStorage: (state, action) => {
            let item = localStorage.getItem("ai-local-store");
            console.log(item);
            if (item) {
                state.itemsList = JSON.parse(item);
            }
        },
    }
});


export const {addAi, deleteAi, updateAi, toggleIsSync, setResponse, saveResponse, loadStateFromLocalStorage} = aiSlice.actions;

export const saveResponseAsync = newItem => async dispatch => {
    dispatch(toggleIsSync(true));
    dispatch(saveResponse(newItem));
    dispatch(setResponse(""));
    dispatch(toggleIsSync(false))
}

export const processPromptAsync = prompt => async dispatch => {
    dispatch(toggleIsSync(true));
    //TODO: make call to back end and get response
    const result = await axios.get("/api/process-prompt/" + prompt);
    dispatch(setResponse(result.data));
    dispatch(toggleIsSync(false))
    return "response";
}

export const aiState = state => state.ai;

export default aiSlice.reducer;
