"use client";
import { useGetListFilterType, useGetListPokemon } from '@/components/hooks/herohooks';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from "next/link";
import styled from '@emotion/styled';
import ListCard from "@/components/pages/list-card";


interface PokemonResult {
    name    : string;
    url     : string; 
    id      : number;
}

interface PokemonData {
    results : PokemonResult[];
    count   : number;
}

const Home = () => {
    const [offset, setOffset]   = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [sorting, setSorting] = useState('lowest');
    const [filterType, setFilterType] = useState('all');

    const [listPokemonData, setListPokemonData] = useState<PokemonData>({
        results : [],
        count   : 0,
    });
    const limit = 40; 

    const { data, isLoading, isError } = useGetListPokemon(offset, limit);
    const { data: listFilterType, isLoading: isLoadingFilter, isError: isErrorFilter } = useGetListFilterType(limit);

    useEffect(() => {
        if (data && data.results) {
            const ids = data.results.map((pokemon: { url: string; }) => {
                const segments = pokemon.url.split('/');
                return segments[segments.length - 2]; 
            });
            
            const resultsWithIds = data.results.map((pokemon: any, index: string | number) => ({
                ...pokemon, 
                id: Number(ids[index]), 
            }));

            setListPokemonData(prevData => ({
                results: [...prevData.results, ...resultsWithIds],
                count: data.count,
            }));

            if (data.results.length < limit) {
                setHasMore(false);
            }
        }
    }, [data]);

    useEffect(() => {
        if (sorting == 'asc' || sorting == 'dsc'){
            const sortedResults = [...listPokemonData.results].sort((a, b) => {
                return sorting == 'dsc'
                    ? b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })
                    : a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
            });

            setListPokemonData(prevData => ({
                ...prevData,
                results: sortedResults,
            }));
        } else if (sorting == 'lowest' || sorting == 'highest'){
            setListPokemonData(prevData => {
                const sortedResults = [...prevData.results].sort((a, b) => {
                    return sorting === 'lowest' ? a.id - b.id : b.id - a.id;
                });
                return {
                    ...prevData,
                    results: sortedResults,
                };
            });
        }
    }, [sorting]);

    useEffect(() => {

    }, [filterType])

    const fetchData = () => {
        if (hasMore) {
            setOffset(prevOffset => prevOffset + limit); 
        }
    };

    if (isLoading) return <h4>Loading...</h4>;
    if (isError) return <h4>Error loading Pokémon data</h4>;

    return (
        <StyledContainer className="font-[family-name:var(--font-geist-sans)]">
            <StyledHeroTitle className="text-center">
                <Link href="/#" className="font-bold md:text-6xl text-lg">Pokédex</Link>
            </StyledHeroTitle>
            <div className='grid grid-cols-2'>
                <div className='flex gap-2 items-center flex-col md:flex-row'>
                    <b className='text-sm md:text-xl'>Type</b>
                    <StyledSelect
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                    >
                        <option value="" className='capitalize'>all</option>

                        {listFilterType?.results?.map((res: any, idx: number) => (
                            <option key={idx} value={res?.name} className='capitalize'>{res?.name}</option>
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
            <InfiniteScroll
                dataLength={listPokemonData.results.length} 
                next={fetchData} 
                hasMore={hasMore}
                loader={<h4>Loading more Pokémon...</h4>}
                endMessage={<p>No more Pokémon to display.</p>}
            >
            <ListCard
                DATA={listPokemonData.results}
                loading={isLoading}
            />
            </InfiniteScroll>
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
        font-size: 3rem; 
        padding: 20px 22px;
    }
`

const StyledHeroTitle = styled.div`
`;

const StyledSelect = styled.select`
    width: 40%;
    border-radius: 6px;
    color: #000;
    padding: 6px;
    font-size: 14px;
    text-transform: capitalize;

    @media (max-width: 768px) {
        width: 132px;
        font-size: 12px;        
    }
`; 
