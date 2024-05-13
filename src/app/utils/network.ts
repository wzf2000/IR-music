import axios, { AxiosError, AxiosResponse } from "axios";
import { AxiosInstance } from "axios";

const esNetwork = axios.create({
    baseURL: '/es',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'ApiKey OHhJbWJZOEJEN0cxSWJ6Z2NBQnc6eGRacF9GSWhTMUt4Z2hFcF9IM2ZmZw',
    },
});

const request = async (
    network: AxiosInstance,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
    headers?: any
) => {
    const config = {
        method,
        url,
        data,
        headers
    };
    const response = await axios(config)
        .catch((error: AxiosError) => {
            console.error('Error:', error);
            return error.response;
        }
    );
    return response;
}

export const search = async (query: string, size: number | null = null) => {
    const response = size == null ? await request(esNetwork, 'GET', `/es/music/_search?q=${query}`) : await request(esNetwork, 'GET', `/es/music/_search?q=${query}&size=${size}`);
    return response;
}
