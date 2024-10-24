import { getDetailPokemon, getFilterType, getListFilterType, getListPokemon } from "../../../services/header";
import { useQuery } from 'react-query';


export const useGetListPokemon = (offset: number, limit: number, rehit: boolean) => {
    return useQuery(['list_pokemon', offset, limit, rehit], () => getListPokemon(offset, limit), {
        keepPreviousData: true, 
    });
};

export const useGetListFilterType = (limit: number) => {
    return useQuery(['list_filter_type', limit], () => getListFilterType(limit), {
        keepPreviousData: true, 
    });
};

export const useGetDetail = (selected: string) => {
    return useQuery(['pokemon_detail', selected], () => getDetailPokemon(selected), {
        keepPreviousData: true, 
    });
};

export const useGetFilterType = (selected: string) => {
    return useQuery(['filter_type', selected], () => getFilterType(selected), {
        keepPreviousData: true, 
    });
};