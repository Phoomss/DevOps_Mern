
import axios from 'axios'

const defaultOptions = {
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export default instance;