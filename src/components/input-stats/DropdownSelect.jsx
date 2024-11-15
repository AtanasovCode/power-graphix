import { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { exercises } from '../../assets/data/MockData';
import { getExerciseIcon } from '../GetIcon';
import { useStore } from '../../../useStore';
import {
    DotOutline,
    MagnifyingGlass,
    X,
} from '@phosphor-icons/react';

const DropdownSelect = ({
    index,
    onExerciseDataUpdate,
    mobileView,
}) => {

    const {
        exercisesData,
        toggleMultipleExercises,
    } = useStore();

    const childRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const [name, setName] = useState("");
    const [PR, setPR] = useState(0);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleExerciseChange = (name) => {
        setName(name);
        onExerciseDataUpdate(index, name, PR);
        toggleDropdown();
    };

    const handlePrChange = (event) => {
        setPR(parseInt(event.currentTarget.value));
        onExerciseDataUpdate(index, name, parseInt(event.currentTarget.value));
    };

    return (
        <Input>
            <Dropdown
                onClick={() => (mobileView && isOpen) ? console.log() : toggleDropdown()}
            >
                {
                    !isOpen && name ?
                        <Heading>
                            <SearchExercise
                                src={getExerciseIcon(name)}
                            />
                            {name}
                        </Heading>
                        :
                        <SearchContainer
                            onClick={() => {
                                (mobileView && isOpen) ? console.log() : toggleDropdown();
                            }}
                            isOpen={isOpen}
                        >
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
                {isOpen && (
                    <List>
                        <CloseList onClick={toggleMultipleExercises}>
                            <X
                                size={32}
                                color="#ccc"
                                weight="light"
                            />
                        </CloseList>
                        {filteredExercises.map((exercise) => (
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
                value={isNaN(PR) || PR === 0 ? "" : PR}
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
    width: 30%;
    padding: 1rem;
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
    border-bottom-right-radius: 16px;
    border-top-right-radius: 16px;
    border: none;
`;

const Dropdown = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 17px;
    margin-right: .4rem;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
`;

const Heading = styled.div`
    width: 100%;
    padding: 1rem;
    padding-left: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme.secondary};

    @media (max-width: 550px) {
        font-size: 14px;
    }
`;

const SearchContainer = styled.div`
    width: 70%;
    width: 100%;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    overflow: hidden;

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

const SearchExercise = styled.img`
    position: absolute;
    top: 50%;
    left: 4%;
    transform: translateY(-50%);
    height: 20px;
    filter: invert(100%);

    @media (min-width: 550px) {
        height: 27px;
    }
`;

const List = styled.div`
    overflow-y: auto;
    max-height: 250px;
    height: 300px;
    background-color: ${props => props.theme.background};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        z-index: 9999;
        border: none;
        padding-top: 4rem;
    }
`;

const CloseList = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 2%;
        right: 5%;
        z-index: 99;
    }
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: .6rem;
    background-color: ${props => props.theme.secondary};
    cursor: pointer;

    @media (max-width: 768px) {
        padding: 1rem;
        margin-bottom: .5rem;
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
