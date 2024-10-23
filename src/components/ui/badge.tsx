import { Key } from "react";
import styled from '@emotion/styled';

interface BadgeProps {
    data: any;
}

const BadgeTypes: React.FC<BadgeProps> = ({ data }) => {

    return (
        <div className="flex gap-2 justify-center capitalize">
            {data.map((res: any, idx: Key | null | undefined) => (
                <StyledBadge key={idx} color={res.type.name}>{res.type.name}</StyledBadge>
            ))}
        </div>
    )
}

export default BadgeTypes;

interface StyledBandgeProps {
    color   : string;
}

const gradients: { [key: string]: string; } = {
    normal  : '#A8A77A',
    fighting: '#C22E28',
    flying  : '#AEB8F0',
    poison  : '#A33E9E',
    ground  : '#E2BF6A',
    rock    : '#B6A96C',
    bug     : '#A6B91A',
    ghost   : '#7B62A0',
    steel   : '#B7B9D0',
    fire    : '#EE8130',
    water   : '#6390F0',
    grass   : '#7AC74C',
    electric: '#F7D02C',
    psychic : '#F95587',
    ice     : '#96D9D6',
    dragon  : '#6F35FC',
    dark    : '#705746',
    fairy   : '#D685B8',
    stellar : '#1D3D73',
    unknown : '#D1D1D1',
    default : '#D4BEE4',
}
const StyledBadge = styled.div<StyledBandgeProps>`
    background  : ${({ color }) => gradients[color] || gradients.default};
    padding     : 4px 12px;
    border-radius: 4px;
    margin-top  : 6px;
    box-shadow  : 2px -1px 8px #50484466;
    font-size   : 12px;

    @media (max-width: 768px) {
        font-size: 10px; 
    }




`
