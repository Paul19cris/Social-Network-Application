import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appReducer from '../components/Application/slice'

export const reducer = combineReducers({
    appState: appReducer,
})

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})