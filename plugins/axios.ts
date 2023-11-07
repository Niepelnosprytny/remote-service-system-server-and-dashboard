import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = "/api";

    const axiosInstance = axios.create({
        baseURL: defaultUrl,
        headers: {
            common: {},
        },
    });

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});