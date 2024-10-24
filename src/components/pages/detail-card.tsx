"use client";

import {
    DrawerBody,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useGetDetail } from "../hooks/herohooks";
import Image from "next/image";
import BadgeTypes from "../ui/badge";

interface DetailCardProps {
    name    : string;
}

const DetailCard: React.FC<DetailCardProps> = (props) => {
    const { name } = props;
    const { data } = useGetDetail(name);
    const urlLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const convertNumber = (num: number) => {
        return num?.toString().padStart(4, '0');
    };

    return (
        <>
            <DrawerBody className="pt-14">
                <div className="w-full flex justify-center">
                        <Image
                            src={`${urlLink + data?.id}.png`}
                            width={150}
                            height={150}
                            alt={`Picture of ${name}`}
                            priority
                            style={{ objectFit: 'contain' }}
                        />
                </div>
                <DrawerTitle className="text-2xl font-bold capitalize text-center">{name} - #{convertNumber(data?.id)}</DrawerTitle>
                <div className="flex items-center text-base gap-2 my-3 w-full">
                    <div className="w-2/4 font-semibold">
                        Type
                    </div>
                    <div className="w-2/4">
                        <BadgeTypes data={data?.types} />
                    </div>
                </div>

                <div className="flex text-base gap-2 my-3 w-full">
                    <div className="w-2/4 font-semibold">
                        Weight
                    </div>
                    <div className="w-2/4">
                        {data?.weight} Kg
                    </div>
                </div>

                <div className="flex text-base gap-2 my-3 w-full">
                    <div className="w-2/4 font-semibold">
                        Height
                    </div>
                    <div className="w-2/4">
                        {data?.height} m
                    </div>
                </div>

                <div className="flex text-base gap-2 my-3 w-full">
                    <div className="w-2/4 font-semibold">
                        Abalities
                    </div>
                    <div className="w-2/4">
                        {data?.abilities?.map((res: any, idx: number) => (
                            <span key={idx} className="capitalize"> {res?.ability?.name},</span>
                        ))}
                    </div>
                </div>     


                <div className="flex text-base gap-2 my-3 w-full">
                    <div className="w-full font-semibold">
                        Statistic
                        <hr/>
                    </div>
                </div>  

                {data?.stats?.map((res: any, idx: number) => (
                    <div key={idx} className="flex text-base gap-2 my-1.5 w-full">
                        <div className="w-2/4 font-semibold">
                            {res?.stat?.name}
                        </div>
                        <div className="w-2/4">
                            {res?.base_stat}
                        </div>
                    </div>  
                ))}
                </DrawerBody>
        </>
    );
};

export default DetailCard;



