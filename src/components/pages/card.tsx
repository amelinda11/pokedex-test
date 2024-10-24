"use client";

import { useState } from 'react';
import {
    DrawerBackdrop,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
} from "@/components/ui/drawer";
import "../../app/globals.css";
import MainCard from './main-card';
import DetailCard from './detail-card';
interface CardProps {
    name: string;
    imageUrl: string;
    position: any;
    height: string;
}

const Card: React.FC<CardProps> = ({ name, imageUrl, position, height }) => {

    const [selectedPokemon, setSelectedPokemon] = useState<string>('');
    const handleSelectPokemon = () => {
        setSelectedPokemon(name);
    };

    return (
        <DrawerRoot>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <button onClick={handleSelectPokemon}>
                    <MainCard
                        name={name}
                        imageUrl={imageUrl}
                        position={position}
                        height={height}
                    />
                </button>
            </DrawerTrigger>
            <DrawerContent offset="4" rounded="md">
                <DetailCard name={selectedPokemon} />
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    );
};

export default Card;
