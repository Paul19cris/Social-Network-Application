import { axiosInstance } from "../../../../api/api";

export const setNotToSeenCall = async (lst) => axiosInstance.post(`/notification/setToSeenNotification?username=${lst[0]}&notId=${lst[1]}`)