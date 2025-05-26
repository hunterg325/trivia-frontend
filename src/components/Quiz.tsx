import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {QuizState} from "../types";
import {AppDispatch, resetQuiz, selectAnswer, submitQuiz} from "../store";
import {FlexContainer, AnswerButton, HiddenInput, SubmitButton} from "../common/styles";

export const Quiz: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useNavigate();
    const { questions, status } = useSelector((state: { quiz: QuizState }) => state.quiz);
    const allAnswered = questions.every((q) => q.selectedAnswer);

    const handleSubmit = () => {
        dispatch(submitQuiz()).then(() => history('/results'));
    };

    const handleNewQuiz = () => {
        dispatch(resetQuiz());
        history('/');
    };

    if (status === 'loading') return <p>Loading...</p>

    if (questions.length === 0) {
        return <>
            <p>No quiz loaded</p>
            <SubmitButton onClick={handleNewQuiz}>Start New Quiz</SubmitButton>
        </>
    }

    return (
        <div>
            <h1>Quiz</h1>
            {questions.map((q) => (
                <div key={q._id}>
                    <p>{q.question}</p>
                    <FlexContainer>
                        {q.options.map((option) => (
                            <AnswerButton
                                key={option}
                                className={q.selectedAnswer === option ? "selected" : ""}
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                <HiddenInput
                                    type="radio"
                                    name={q._id}
                                    value={option}
                                    checked={q.selectedAnswer === option}
                                    onChange={() => dispatch(selectAnswer({questionId: q._id, answer: option}))}
                                />
                                {option}
                            </AnswerButton>
                        ))}
                    </FlexContainer>
                </div>
            ))}
            <SubmitButton disabled={!allAnswered} onClick={handleSubmit} style={{
                marginTop: 15,
            }}>
                Submit
            </SubmitButton>
        </div>
    );
};
