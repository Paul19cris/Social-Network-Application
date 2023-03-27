import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAllUsers, callAllUsersByKey } from "./services";
import { getUnseenNrCall } from "./services";

export const getUnseenNr = createAsyncThunk('getUnseenNr', async (username) => {
    try {
        const response = await getUnseenNrCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getAllUsersByKey = createAsyncThunk('getAllUsersByKey', async (key) => {
    try {
        const response = callAllUsersByKey(key)

        return response
    }

    catch (e) {
        return null
    }
})

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    try {
        const response = callAllUsers()

        return response
    }

    catch (e) {
        return null
    }
})