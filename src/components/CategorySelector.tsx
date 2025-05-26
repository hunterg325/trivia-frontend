import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {QuizState} from "../types";
import {AppDispatch, fetchCategories, setSelectedCategory, setSelectedDifficulty, startQuiz} from "../store";
import {CategoryContainer, StyledSelect, SubmitButton} from "../common/styles";

export const CategorySelector: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useNavigate();
    const { categories, selectedCategory, selectedDifficulty, status } = useSelector((state: { quiz: QuizState }) => state.quiz);

    useEffect(() => {
        if (categories.length === 0) dispatch(fetchCategories());
    }, [dispatch, categories.length]);

    const handleStartQuiz = () => {
        dispatch(startQuiz()).then(() => history('/quiz'));
    };

    return (
        <CategoryContainer>
            <h1 style={{ textAlign: 'center'}}>Quiz Maker</h1>
            {status === 'loading' && <p>Loading...</p>}
            <StyledSelect
                value={selectedCategory || ''}
                onChange={(e) => dispatch(setSelectedCategory(Number(e.target.value)))}
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </StyledSelect>
            <StyledSelect
                value={selectedDifficulty || ''}
                onChange={(e) => dispatch(setSelectedDifficulty(e.target.value))}
            >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </StyledSelect>
            <SubmitButton
                disabled={!selectedCategory || !selectedDifficulty || status === 'loading'}
                onClick={handleStartQuiz}
            >
                Create
            </SubmitButton>
        </CategoryContainer>
    );
};
