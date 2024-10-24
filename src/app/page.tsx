"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useGetFilterType, useGetListFilterType, useGetListPokemon } from '@/components/hooks/herohooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from "next/link";
import styled from '@emotion/styled';
import ListCard from "@/components/pages/list-card";
import SkeletonApp from '@/components/ui/skeleton-app';

interface PokemonResult {
    name: string;
    url: string;
    id: number;
}

interface PokemonItem {
    pokemon: any;
    slot: number;
}

interface FilterType {
    name: string;
}

interface PokemonData {
    results: PokemonResult[];
    count: number;
}

const Home = () => {
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [sorting, setSorting] = useState('lowest');
    const [filterType, setFilterType] = useState('');
    const [rehit, setRehit] = useState(false);

    const [listPokemonData, setListPokemonData] = useState<PokemonData>({
        results: [],
        count: 0,
    });

    const limit = 40;

    const { data, isLoading, isError } = useGetListPokemon(offset, limit, rehit);
    const { data: listFilterType } = useGetListFilterType(limit);
    const { data: dataFilterType, isLoading: isLoadingFilter } = useGetFilterType(filterType);

    useEffect(() => {
        if (!data || !data.results) return;

        const resultsWithIds = data.results.map((pokemon: { url: string; }) => {
            const id = extractIdFromUrl(pokemon.url);
            return { ...pokemon, id };
        });

        setListPokemonData(prevData => ({
            results: [...prevData.results, ...resultsWithIds],
            count: data.count,
        }));

        if (data.results.length < limit) {
            setHasMore(false);
        }
    }, [data]);

    useEffect(() => {
        if (filterType && dataFilterType?.pokemon) {
            const resultsWithIds = dataFilterType.pokemon.map((item: PokemonItem) => ({
                name: item.pokemon.name,
                url: item.pokemon.url,
                id: extractIdFromUrl(item.pokemon.url),
            }));

            setListPokemonData({
                results: resultsWithIds,
                count: resultsWithIds.length,
            });
        }
    }, [dataFilterType, filterType]);

    useEffect(() => {
        if (!filterType) {
            setOffset(0);
            setRehit(prev => !prev);
        }
    }, [filterType]);

    useEffect(() => {
        setListPokemonData(prevData => ({
            ...prevData,
            results: sortResults(prevData.results, sorting),
        }));
    }, [sorting]);

    const fetchData = useCallback(() => {
        if (hasMore && !filterType) {
            setOffset(prevOffset => prevOffset + limit);
        }
    }, [hasMore, filterType]);

    const extractIdFromUrl = (url: string) => {
        const segments = url.split('/');
        return Number(segments[segments.length - 2]);
    };

    const sortResults = (results: PokemonResult[], sorting: string) => {
        const sortedResults = [...results];
        if (sorting === 'asc') {
            sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sorting === 'dsc') {
            sortedResults.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sorting === 'lowest') {
            sortedResults.sort((a, b) => a.id - b.id);
        } else if (sorting === 'highest') {
            sortedResults.sort((a, b) => b.id - a.id);
        }
        return sortedResults;
    };

    if (isError) return <h4>Error loading Pokémon data</h4>;

    return (
        <StyledContainer>
            <div className='text-center'>
                <Link href="/#" className="font-bold md:text-6xl text-lg">Pokédex</Link>
            </div>
            <div className='grid grid-cols-2'>
                <div className='flex gap-2 items-center flex-col md:flex-row'>
                    <b className='text-sm md:text-xl'>Type</b>
                    <StyledSelect
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                    >
                        {listFilterType?.results?.map((res: FilterType, idx: number) => (
                            <option key={idx} value={res.name} className='capitalize'>{res.name}</option>
                        ))}
                    </StyledSelect>
                </div>
                <div className='justify-end flex gap-2 items-center flex-col md:flex-row'>
                    <b className='text-sm md:text-xl'>Sorting</b>
                    <StyledSelect
                        value={sorting}
                        onChange={e => setSorting(e.target.value)}
                    >
                        <option value="lowest">Lowest Number</option>
                        <option value="highest">Highest Number</option>
                        <option value="asc">A-Z</option>
                        <option value="dsc">Z-A</option>
                    </StyledSelect>
                </div>
            </div>
            {isLoading || isLoadingFilter ? <SkeletonApp /> :
                <InfiniteScroll
                    dataLength={listPokemonData.results.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading more Pokémon...</h4>}
                    endMessage={<p>No more Pokémon to display.</p>}
                >
                    <ListCard DATA={listPokemonData.results} loading={isLoading} />
                </InfiniteScroll>
            }

        </StyledContainer>
    );
};

export default Home;

const StyledContainer = styled.div`
    display: grid;
    min-height: 100vh;
    gap: 36px;
    padding: 40px 226px;

    @media (max-width: 768px) {
        padding: 20px 22px;
    }
`;

const StyledSelect = styled.select`
    width: 40%;
    border-radius: 6px;
    padding: 6px;
    font-size: 14px;
    color: rgb(15, 12, 41);
    text-transform: capitalize;

    @media (max-width: 768px) {
        width: 132px;
        font-size: 12px;        
    }
`;