import { axiosInstance } from "../../api/api";

export const registerCall = async (account) => axiosInstance.post('/account/register', account, { headers: { Authorization: undefined } })