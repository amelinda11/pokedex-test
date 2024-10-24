import styled from '@emotion/styled';
import {
    SkeletonCircle,
    SkeletonText,
} from "./skeleton"

const SkeletonApp: React.FC = () => {

    return (
        <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
            {Array.from({ length: 22 }).map((_, index) => (
                <StyledCardContainer key={index}>
                    <SkeletonCircle size="20"></SkeletonCircle>
                    <SkeletonText noOfLines={2}/>
                </StyledCardContainer>
            ))}
        </div>
        
    );
};

export default SkeletonApp;

const StyledCardContainer = styled.div`;
    border: 1px solid #fff;
    border-radius: 8px;
    margin: 8px;
    min-width: 143px;
    min-height: 198px;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
    flex-direction: column;
`;