import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

import {resetQuiz} from "../store";
import {QuizState} from "../types";
import {AnswerButton, FlexContainer, ScoreBar, SubmitButton} from "../common/common";

export const Results: React.FC = () => {
    const dispatch = useDispatch<any>();
    const history = useNavigate();
    const { questions, score, status } = useSelector((state: { quiz: QuizState }) => state.quiz);

    const handleNewQuiz = () => {
        dispatch(resetQuiz());
        history('/');
    };

    if (status === 'loading') return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>Results</h1>
            <p>You scored {score} out of 5</p>
            <ScoreBar score={score} />
            {questions.map((q) => (
                <div key={q._id} className="question">
                    <p>{q.question}</p>
                    <FlexContainer>
                        {q.options.map((option) => (
                            <AnswerButton
                                key={option}
                                className={option === q.correctAnswer ?
                                    "selected" :
                                    option === q.selectedAnswer && !q.isCorrect ?
                                        "incorrect" :
                                        "not-selected"}
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                {option}
                            </AnswerButton>
                        ))}
                    </FlexContainer>
                </div>
            ))}
            <SubmitButton onClick={handleNewQuiz} style={{
                marginTop: 15
            }}>
                Start New Quiz
            </SubmitButton>
        </div>
    );
};
