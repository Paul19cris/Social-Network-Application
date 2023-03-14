import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserCall } from "./services";

export const fetchUserData = createAsyncThunk('fetchUserData', async (account) => {
    try {
        const response = await fetchUserCall(account);
        console.log(response)
        
        return response
        
    } catch (error) {
        return null
    }
    
})