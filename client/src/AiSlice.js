import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import _ from 'lodash';

export const aiSlice = createSlice({
    name: 'ai',
    initialState: {isSyncing: false, response: "", itemsList: [], nextId: 0, sortOrder: "CREATED_DESC"},
    reducers: {
        toggleIsSync: (state, action) => {
            state.isSyncing = action.payload;
        },
        setResponse: (state, action) =>{
            state.response = action.payload;
        },
        saveResponse: (state, action) => {
            let items = {...action.payload, id: state.nextId ++};
            state.itemsList.push(items);
            if (state.sortOrder === "CREATED_ASC") {
                state.itemsList.sort((a, b) => a.id - b.id)
            } else if (state.sortOrder === "CREATED_DESC") {
                state.itemsList.sort((a, b) => b.id - a.id)
            }
            localStorage.setItem("ai-local-store", JSON.stringify(state.itemsList));
        },
        loadStateFromLocalStorage: (state, action) => {
            let item = localStorage.getItem("ai-local-store");
            if (item) {
                let itemsList = JSON.parse(item);
                state.itemsList = itemsList;
                state.nextId = itemsList.reduce((maxId, item) => {
                    if(maxId < item.id){
                        maxId = item.id;
                    }
                    return maxId;
                }, 0) + 1;
            }
        },
        deleteItems: (state, action) => {
            console.log("delete items with ids = ", action.payload);
            const idsToDelete = action.payload;
            state.itemsList = state.itemsList.filter(item => !idsToDelete.includes(item.id))
            localStorage.setItem("ai-local-store", JSON.stringify(state.itemsList));
        },
        sortItems: (state, action) => {
            const sortOrder = action.payload;
            state.sortOrder = sortOrder;
            if (sortOrder === "CREATED_ASC") {
                state.itemsList.sort((a, b) => a.id - b.id)
            } else if (sortOrder === "CREATED_DESC") {
                state.itemsList.sort((a, b) => b.id - a.id)
            }
        }
    }
});


export const {toggleIsSync, setResponse, saveResponse, loadStateFromLocalStorage, deleteItems, sortItems} = aiSlice.actions;

export const saveResponseAsync = newItem => async dispatch => {
    dispatch(toggleIsSync(true));
    dispatch(saveResponse(newItem));
    dispatch(setResponse(""));
    dispatch(toggleIsSync(false))
}

export const processPromptAsync = prompt => async dispatch => {
    dispatch(toggleIsSync(true));
    dispatch(setResponse(""));
    const result = await axios.get("/api/process-prompt/" + prompt);
    dispatch(setResponse(result.data));
    dispatch(toggleIsSync(false))
    return "response";
}

export const aiState = state => state.ai;

export default aiSlice.reducer;
