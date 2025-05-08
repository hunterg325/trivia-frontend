import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  startQuiz,
  selectAnswer,
  submitQuiz,
  resetQuiz,
  setSelectedCategory,
  setSelectedDifficulty,
} from './store';
import { QuizState } from './types';


const CategorySelector: React.FC = () => {
  const dispatch = useDispatch<any>();
  const history = useNavigate();
  const { categories, selectedCategory, selectedDifficulty, status } = useSelector((state: { quiz: QuizState }) => state.quiz);

  console.log('CATEGORIES', categories);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const handleStartQuiz = () => {
    dispatch(startQuiz()).then(() => history('/quiz'));
  };

  return (
      <div className="container">
        <h1>Select Category and Difficulty</h1>
        {status === 'loading' && <p>Loading...</p>}
        <select
            value={selectedCategory || ''}
            onChange={(e) => dispatch(setSelectedCategory(Number(e.target.value)))}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
          ))}
        </select>
        <select
            value={selectedDifficulty || ''}
            onChange={(e) => dispatch(setSelectedDifficulty(e.target.value))}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
            disabled={!selectedCategory || !selectedDifficulty || status === 'loading'}
            onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
  );
};

const Quiz: React.FC = () => {
  const dispatch = useDispatch<any>();
  const history = useNavigate();
  const { questions, status } = useSelector((state: { quiz: QuizState }) => state.quiz);
  const allAnswered = questions.every((q) => q.selectedAnswer);

  const handleSubmit = () => {
    dispatch(submitQuiz()).then(() => history('/results'));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (questions.length === 0) return <p>No quiz loaded</p>;

  // @ts-ignore
  return (
      <div className="container">
        <h1>Quiz</h1>
        {questions.map((q) => (
            <div key={q._id} className="question">
              <p>{q.question}</p>
              {q.options.map((option) => (
                  <label key={option} className="option">
                    <input
                        type="radio"
                        name={q._id}
                        value={option}
                        checked={q.selectedAnswer === option}
                        onChange={() => dispatch(selectAnswer({ questionId: q._id, answer: option }))}
                    />
                    {option}
                  </label>
              ))}
            </div>
        ))}
        {/** @ts-ignore **/}
        <button disabled={!allAnswered || status === 'loading'} onClick={handleSubmit}>
          Submit
        </button>
      </div>
  );
};

const Results: React.FC = () => {
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
        <div
            className="score-bar"
            style={{
              width: `${(score! / 5) * 100}%`,
              backgroundColor: score! <= 1 ? 'red' : score! <= 3 ? 'yellow' : 'green',
            }}
        />
        {questions.map((q) => (
            <div key={q._id} className="question">
              <p>{q.question}</p>
              {q.options.map((option) => (
                  <p
                      key={option}
                      style={{
                        color:
                            option === q.correctAnswer
                                ? 'green'
                                : option === q.selectedAnswer && !q.isCorrect
                                    ? 'red'
                                    : 'black',
                      }}
                  >
                    {option}
                  </p>
              ))}
            </div>
        ))}
        <button onClick={handleNewQuiz}>Start New Quiz</button>
      </div>
  );
};

const App: React.FC = () => (
    <Router>
      <Routes>
        <Route path="/" element={<CategorySelector />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
);

export default App;
