import React, { FC } from 'react';
import Card from './card';


interface ListCardProps {
    DATA: any[];
    loading: boolean;
    [x: string]: any;
}

const ListCard: FC<ListCardProps> = (props) => {
    const { DATA  } = props;
    const urlLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const convertNumber = (num: number) => {
        return num?.toString().padStart(3, '0'); 
    };    
    return (
        <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
            {DATA?.map((data, idx) => (
                <Card
                    key={idx}
                    name={data.name}
                    imageUrl={`${urlLink + data.id}.png`}
                    position={convertNumber(data.id)}
                    height=''
                />
            ))}
            
        </div>
    )
}

export default ListCard;