import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticate } from "../Application/slice";
import { loginCall } from "./services";

export const authenticateUser = createAsyncThunk('authenticateUser', async (account, { dispatch }) => {
    const action = await loginCall(account)

    if (action.data.returnValue !== null){
        dispatch(authenticate({ email: action.data.returnValue.email }))  
    }

    return action.data
} )
