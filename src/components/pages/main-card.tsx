"use client";

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import BadgeTypes from '../ui/badge';

interface CardProps {
    name: string;
    imageUrl: string;
    position: number;
    height: string;
}

interface StyledCardContainerProps {
    type: string;
}

const MainCard: React.FC<CardProps> = ({ name, imageUrl, position }) => {
    const [color, setColor] = useState<string>('gray');
    const [types, setTypes] = useState<any[]>([]);

    useEffect(() => {
        const fetchColorData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch color data for ${name}`);
                }

                const data = await response.json();
                setColor(data.types[0]?.type.name || 'default');
                setTypes(data.types);
            } catch (error) {
                setColor('default');
            }
        };

        fetchColorData();
    }, [name]);

    return (
        <StyledCardContainer type={color}>
            <div className="capitalize text-xs text-right md:text-xs">#{position}</div>
            <div className="w-full flex justify-center">
                <div className="w-3/5 md:w-4/5">
                    <Image
                        src={imageUrl}
                        width={150}
                        height={150}
                        alt={`Picture of ${name}`}
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
            <div className="capitalize font-semibold text-sm md:text-xl">{name}</div>
            <BadgeTypes data={types} />
        </StyledCardContainer>
    );
};

export default MainCard;

const gradients: Record<string, string> = {
    grass   : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(114,191,120,1) 100%)',
    water   : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(55,175,225,1) 100%)',
    fire    : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(218,92,83,1) 100%)',
    bug     : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(255,178,111,1) 100%)',
    flying  : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(174,184,240,1) 100%)',
    poison  : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(163,62,158,1) 100%)',
    ground  : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(226,191,106,1) 100%)',
    rock    : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(182,169,108,1) 100%)',
    ghost   : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(123,98,160,1) 100%)',
    steel   : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(183,185,208,1) 100%)',
    electric: 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgb(247, 208, 44, 1) 100%)',
    psychic : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgb(249, 85, 135, 1) 100%)',
    ice     : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgb(150, 217, 214, 1) 100%)',
    dragon  : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgb(111, 53, 252, 1) 100%)',
    fairy   : 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgb(215, 133, 184, 1) 100%)',
    default: 'linear-gradient(180deg, rgba(40,195,10,0) 55%, rgba(212,190,228,1) 100%)',
};

const StyledCardContainer = styled.div<StyledCardContainerProps>`
    background: ${({ type }) => gradients[type] || gradients.default};
    border: 1px solid #fff;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    margin: 8px;
    transition: transform 0.3s ease-in-out;

    :hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        padding: 8px;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
