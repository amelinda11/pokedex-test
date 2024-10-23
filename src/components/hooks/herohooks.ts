import { getListFilterType, getListPokemon } from "../../../services/header";
import { useQuery } from 'react-query';


export const useGetListPokemon = (offset: number, limit: number) => {
    return useQuery(['list_pokemon', offset, limit], () => getListPokemon(offset, limit), {
        keepPreviousData: true, 
    });
};

export const useGetListFilterType = (limit: number) => {
    return useQuery(['list_filter_type', limit], () => getListFilterType(limit), {
        keepPreviousData: true, 
    });
};