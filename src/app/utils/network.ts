import axios, { AxiosError, AxiosResponse } from "axios";
import { AxiosInstance } from "axios";
import { headers } from "next/headers";

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
    const response = await network(config)
        .catch((error: AxiosError) => {
            console.error('Error:', error);
            return error.response;
        }
    );
    return response;
}

export const search = async (query: string, size: number | null = null) => {
    // match project_name artists city_name venue_name venue_info.venue_address
    const query_body = {
        "multi_match": {
            "query": query,
            "fuzziness": "AUTO",
            "fields": ["project_name", "artists", "city_name", "venue_name", "venue_info.venue_address"]
        }
    };
    const data = size == null ? {
        "min_score": 5,
        "size": 10000,
        "query": query_body,
    } : {
        "size": size,
        "query": query_body,
    };
    const response = await request(esNetwork, 'POST', `/music_demo/_search`, data);
    return response;
}
