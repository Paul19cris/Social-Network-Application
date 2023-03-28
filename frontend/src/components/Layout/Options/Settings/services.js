import { axiosInstance } from "../../../../api/api";

export const changeUsernameCall = async (lst) => axiosInstance.post(`/account/changeUsername?username=${lst[0]}&newUsername=${lst[1]}&email=${lst[2]}&password=${lst[3]}`)
export const changeEmailCall = async (lst) => axiosInstance.post(`/account/changeEmail?username=${lst[0]}&newEmail=${lst[1]}&email=${lst[2]}&password=${lst[3]}`)
export const changePasswordCall = async (lst) => axiosInstance.post(`/account/changePassword?username=${lst[0]}&newPassword=${lst[1]}&email=${lst[2]}&password=${lst[3]}`)
export const deleteAccountCall = async (lst) => axiosInstance.post(`/account/deleteAccount?username=${lst[0]}&confirm=${lst[1]}&email=${lst[2]}&password=${lst[3]}`)
