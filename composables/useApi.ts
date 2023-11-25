import useAuthStore from "~/stores/auth";
import {storeToRefs} from "pinia";

export const useApi = async (url, fetchOptions = {}, useAsyncOptions = {}) => {
    const store = useAuthStore();
    const { token } = storeToRefs(store);

    const response = await useFetch(url, {
        method: fetchOptions.method,
        query: fetchOptions.query,
        params: fetchOptions.params,
        body: fetchOptions.body,
        headers: {
            ...fetchOptions.headers,
            authorization: `Bearer ${token.value}`
        },
        baseURL: fetchOptions.baseURL,
        timeout: fetchOptions.timeout
    }, useAsyncOptions);


    return {
        body: response.data.value.body,
        status: response.data.value.status
    };
};