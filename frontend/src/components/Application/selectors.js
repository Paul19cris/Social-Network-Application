import { createSelector } from "@reduxjs/toolkit";

const getUserState = (state) => state.appState

export const selectUserData = createSelector([getUserState], appState => appState.userData)
