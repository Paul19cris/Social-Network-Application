import { axiosInstance } from "../../../../api/api";

export const setNotToSeenCall = async (lst) => axiosInstance.post(`/account/setToSeenNotification?username=${lst[0]}&notId=${lst[1]}`)