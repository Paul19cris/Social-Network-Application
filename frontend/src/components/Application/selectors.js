import { createSelector } from "@reduxjs/toolkit";

const getUserState = (state) => state.appState
const getUserVisitState = (state) => state.appState

export const selectUserVisitData = createSelector([getUserVisitState], appState => appState.userVisitData)
export const selectUserData = createSelector([getUserState], appState => appState.userData)