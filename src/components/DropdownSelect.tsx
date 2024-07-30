import { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { exercises } from '../assets/data/MockData';
import { getExerciseIcon } from './GetIcon';
import {
    DotOutline,
    MagnifyingGlass,
    X,
} from '@phosphor-icons/react';

import { AppContext } from './context/AppContext';
import { checkDistance } from './CheckDistance';



interface Exercise {
    name: string;
    category: string;
}

interface Props {
    index: number,
    onExerciseDataUpdate: Function,
    parentRef: any,
    mobileView: boolean,
}

interface StyledProps {
    isOpen: boolean,
}

interface PropsPosition {
    position: string,
}

const DropdownSelect = ({
    index,
    onExerciseDataUpdate,
    parentRef,
    mobileView,
}: Props) => {

    const {
        exercisesData,
        toggleMultipleExercises,
    } = useContext(AppContext);

    const childRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const filteredExercises = exercises.filter((exercise: Exercise) =>
        exercise.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const [name, setName] = useState("");
    const [PR, setPR] = useState(0);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleExerciseChange = (name: string) => {
        setName(name);
        onExerciseDataUpdate(index, name, PR);
        toggleDropdown();
    };

    const handlePrChange = (event: any) => {
        setPR(parseInt(event.currentTarget.value));
        onExerciseDataUpdate(index, name, parseInt(event.currentTarget.value));
    };

    return (
        <Input>
            <Dropdown
                ref={childRef}
                onClick={() => (mobileView && isOpen) ? console.log() : toggleDropdown()}
                isOpen={isOpen}
            >
                {
                    isOpen != true && name != "" ?
                        <Heading>
                            <SearchExercise
                                src={getExerciseIcon(name)}
                            />
                            {name}
                        </Heading>
                        :
                        <SearchContainer isOpen={isOpen}>
                            <Search
                                placeholder="Search exercises..."
                                value={isOpen ? searchText : name}
                                onChange={handleSearchTextChange}
                            />
                            <SearchIcon>
                                <MagnifyingGlass
                                    size="100%"
                                    weight="light"
                                    color="#ccc"
                                />
                            </SearchIcon>
                        </SearchContainer>
                }
                {isOpen == true && (
                    <List position={checkDistance(parentRef, childRef)}>
                        <CloseList onClick={toggleMultipleExercises}>
                            <X
                                size={32}
                                color="#ccc"
                                weight="light"
                            />
                        </CloseList>
                        {filteredExercises.map((exercise: Exercise) => (
                            <Option
                                key={exercise.name}
                                onClick={() => handleExerciseChange(exercise.name)}
                            >
                                <OptionIcon
                                    src={getExerciseIcon(exercise.name)}
                                />
                                <OptionName>{exercise.name}</OptionName>
                                <DotDevide>
                                    <DotOutline
                                        size={25}
                                        color="#cccccc70"
                                        weight="fill"
                                    />
                                </DotDevide>
                                <OptionCategory>{exercise.category}</OptionCategory>
                            </Option>
                        ))}
                    </List>
                )}
            </Dropdown>
            <InputPR
                type="text"
                placeholder="Your PR"
                value={isNaN(PR) || PR == 0 ? "" : PR}
                onChange={handlePrChange}
            />
        </Input>
    );
};

export default DropdownSelect;


const Input = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: center;


    @media (max-width: 550px) {
        grid-template-columns: 1fr auto;
    }
`;

const InputPR = styled.input`
    flex: 33%;
    padding: 1rem;
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
    border: none;

    @media (max-width: 550px) {
        flex: 35%;
    }
`;


const Dropdown = styled.div<StyledProps>`
    position: relative;
    overflow: hidden;
    flex: 66%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 17px;
    margin-right: 8px;
    position: relative;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;

    ${props => props.isOpen && `
        border-radius: 0;
    `}

    @media (max-width: 550px) {
        flex: 65%;
    }
`;

const Heading = styled.div`
    width: 100%;
    padding: 15px;
    padding-left: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 550px) {
        font-size: 14px;
    }
`;

const SearchContainer = styled.div<StyledProps>`
    width: 100%;

    ${props => props.isOpen && `
        @media (max-width: 550px) {
            height: 60px;
            position: fixed;
            top: 0;
            left: 0;
            border-bottom: 1px solid ${props.theme.accent};
        }
    `}
`;

const Search = styled.input`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.secondary};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: none;
    color: ${props => props.theme.text};
    font-size: 16px;
    padding-left: 50px;
]
    @media (max-width: 550px) {
        border-radius: none;
        width: 100%;
        height: 100%;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 4%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
`;

//this is the selected exercise icon:
const SearchExercise = styled.img`
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
    height: 25px;
    filter: invert(100%);

    @media (max-width: 550px) {
        height: 20px;
    }
`;

const List = styled.div<PropsPosition>`
    max-height: 240px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.accent};
    position: absolute;
    z-index: 15;

    ${props => props.position == "bottom" && `
        top: 100%;
        left: 0;
        right: 0;
    `}

    //When there is not enough space below the dropdown
    //display the list above
    ${props => props.position == "top" && `
        bottom: 100%;
        left: 0;
        right: 0; 
    `}

    @media (max-width: 550px) {
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 20;
        max-height: 100vh;
        border: none;
    }
`;

const CloseList = styled.div`
    opacity: 0;
    position: absolute;
    right: -500%;

    @media (max-width: 550px) {
        opacity: 1;
        position: absolute;
        top: 150px;
        right: 150px;
        z-index: 99;
    }
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid ${props => props.theme.accent};
    cursor: pointer;

    @media (max-width: 550px) {
        padding: 15px;
    }
`;

const OptionName = styled.div`
    font-size: 15px;

    @media (max-width: 550px) {
        font-size: 17px;
    }
`;

const OptionCategory = styled.div`
    font-size: 13px;
    color: darkgray;
    font-weight: 300;

    @media (max-width: 550px) {
        font-size: 14px;
    }
`;

const OptionIcon = styled.img`
    height: 35px;
    filter: invert(100%);
    margin-right: 10px;

    @media (max-width: 550px) {
        height: 35px;
        margin-right: 15px;
    }
`;

const DotDevide = styled.div`
    margin: 0 1px;
    display: flex;
    align-items: center;
    justify-content: center;
`;