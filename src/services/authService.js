import axiosInstance from "../config/AxiosConfig";


const login = async (data) => {
    try {
        const res = await axiosInstance.post(`/user/login`, data);
        // const {accessToken} = res.data.data
        console.log(res.data);
        return res.data;

    } catch (err) {
        console.error("Login error:", err.response?.data.message || err.message);
        return {
            error: err.response?.data.message || "An error occurred while logging in.",
        };
    }
}

const authService = {
  login
};
export default authService;
