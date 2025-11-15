import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";


const context = createContext();

export const ContextProvider = ({ children }) => {

    const VITE_API_KEY = import.meta.env.VITE_API_URL;

    const api = axios.create({
        baseURL: VITE_API_KEY,
        headers: {
            "Content-Type": "application/json"
        }
    })

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const axiosInstance = {
        get: (url, params = {}) => api.get(url, { params }),
        post: (url, data) => api.post(url, data),
        put: (url, data) => api.put(url, data),
        delete: (url, data = {}) => api.delete(url, { data })
    }

    return <>

        <context.Provider value={ { axiosInstance } }>
            {children}
        </context.Provider>

    </>
}

export const useAuthContext = () => useContext(context);