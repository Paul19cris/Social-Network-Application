import { createAsyncThunk } from "@reduxjs/toolkit";
import { setNotToSeenCall } from "./services";

export const setNotToSeenData = createAsyncThunk('setToSeenNotification', async (lst) => {
    try {
        const response = await setNotToSeenCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})