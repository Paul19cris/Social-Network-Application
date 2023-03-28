import { createAsyncThunk } from "@reduxjs/toolkit"
import { authenticate } from "../Application/slice"
import { registerCall } from "./services"

export const registerUser = createAsyncThunk('registerUser', async (account, { dispatch }) => {
    const action = await registerCall(account)
    
    if (action.data.returnValue !== null){
        dispatch(authenticate({ email: action.data.returnValue.email }))  
    }
    
    return action.data
} )