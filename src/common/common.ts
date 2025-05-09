import styled from 'styled-components';

export const PageContainer = styled.div`
    max-width: 1200px;
    margin: auto;
`

export const FlexContainer = styled.div`
    display: flex;
    
    label:first-of-type {
        margin-left: 0 !important;
    }
`;

export const AnswerButton = styled.label`
    display: block;
    outline: 1px solid green;
    border-radius: 5px;
    color: green;
    padding: 10px 15px 10px 15px;
    font-size: 15px;
    width: max-content;
    transition: 0.3s all ease-in-out;
    cursor: pointer;
    
    &.selected {
        background-color: green;
        color: white !important
    }
    
    &.incorrect {
        color: white !important;
        background-color: red !important;
    }
    
    &.not-selected {
        color: black;
    }
`;

export const HiddenInput = styled.input`
    -webkit-appearance: none;
    margin: 0;
`;

export const SubmitButton = styled.button`
    color: #333;
    padding: 10px 15px 10px 15px;
    width: max-content;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
   
    &:hover {
        background-color: #e0e0e0;
        color: #000;
    }
    
    &:disabled {
        background-color: rgba(239, 239, 239, 0.3);
        cursor: not-allowed;
        opacity: 0.4;
    }
`;

interface ScoreBarProps {
    score?: number | null;
}

export const ScoreBar = styled.div<ScoreBarProps>`
    height: 30px;
    width: ${(props => props.score! / 5 * 100)}%;
    background-color: ${(props => props.score! <= 1 ? 'red' : props.score! <= 3 ? 'yellow' : 'green')};
`;

export const StyledSelect = styled.select`
    color: #333;
    outline: 1px solid black;
    padding: 10px 40px 10px 10px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    position: relative;
    margin-right: 1px;
    
    /* Arrow */
    &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        margin-left: -5px;
        width: 10px;
        height: 10px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid black;
    }
`;

export const CategoryContainer = styled.div`
    text-align: center;
`;
