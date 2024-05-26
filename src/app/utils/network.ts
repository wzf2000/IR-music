import axios, { AxiosError, AxiosInstance } from "axios";

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
            "fields": ["project_name^6", "artists^6", "city_name^2", "venue_name", "venue_info.venue_address", "project_info^4"]
        }
    };
    const data = size == null ? {
        "min_score": 24,
        "size": 10000,
        "query": query_body,
    } : {
        "size": size,
        "query": query_body,
    };
    const response = await request(esNetwork, 'POST', `/music_demo/_search`, data);
    return response;
}

export const document = async (id: string) => {
    const response = await request(esNetwork, 'GET', `/music_demo/_doc/${id}`);
    return response;
}

export const similar = async (id: string, size: number | null = null) => {
    const query_body = {
        "more_like_this": {
            "fields": [ "project_name", "project_info", "artists", "city_name" ],
            "like": [
                {
                    "_index": "music_demo",
                    "_id": id,
                },
            ],
            "min_term_freq": 1,
            "max_query_terms": 12
        },
    };
    const data = size == null ? {
        "size": 10,
        "query": query_body,
    } : {
        "size": size,
        "query": query_body,
    };
    const response = await request(esNetwork, 'POST', `/music_demo/_search`, data);
    return response;
}
