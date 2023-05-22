import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeEmailCall, changePasswordCall, changeUsernameCall, deleteAccountCall } from "./services";

export const changeUsernameData = createAsyncThunk('changeUsername', async (lst) => {
    try {
        const response = await changeUsernameCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const changeEmailData = createAsyncThunk('changeEmail', async (lst) => {
    try {
        const response = await changeEmailCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const changePasswordData = createAsyncThunk('changePassword', async (lst) => {
    try {
        const response = await changePasswordCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const deleteAccountData = createAsyncThunk('deleteAccount', async (lst) => {
    try {
        const response = await deleteAccountCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})