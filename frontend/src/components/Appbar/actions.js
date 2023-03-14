import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAllUsers, callAllUsersByKey } from "./services";

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