import axios, { AxiosRequestConfig } from 'axios';
import endpoint from './endpoint';

export const getListPokemon = (offset: number, limit: number) => {
    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const url = `${endpoint.listPokemon}?offset=${offset}&limit=${limit}`;

    return axios.get(url, options).then(response => response.data);
};

export const getListFilterType = (limit: number) => {
    const options: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const url = `${endpoint.listFilterType}?limit=${limit}`;

    return axios.get(url, options).then(response => response.data);
};