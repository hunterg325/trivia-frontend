import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { QuizState, FrontendCategory, FrontendQuestion } from './types';

const initialState: QuizState = {
    categories: [],
    selectedCategory: null,
    selectedDifficulty: null,
    questions: [],
    score: null,
    status: 'idle',
    error: null,
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setSelectedCategory(state, action: { payload: number }) {
            state.selectedCategory = action.payload;
        },
        setSelectedDifficulty(state, action: { payload: string }) {
            state.selectedDifficulty = action.payload;
        },
        selectAnswer(state, action: { payload: { questionId: string; answer: string } }) {
            const { questionId, answer } = action.payload;
            const question = state.questions.find((q) => q._id === questionId);
            if (question) question.selectedAnswer = answer;
        },
        resetQuiz(state) {
            state.questions = [];
            state.score = null;
            state.selectedCategory = null;
            state.selectedDifficulty = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action: { payload: FrontendCategory[] }) => {
                state.status = 'idle';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || 'Failed to fetch categories';
            })
            .addCase(startQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(startQuiz.fulfilled, (state, action: { payload: FrontendQuestion[] }) => {
                state.status = 'idle';
                state.questions = action.payload.map((q) => ({
                    ...q,
                    selectedAnswer: null,
                    correctAnswer: null,
                    isCorrect: null,
                }));
            })
            .addCase(startQuiz.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || 'Failed to start quiz';
            })
            .addCase(submitQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitQuiz.fulfilled, (state, action: { payload: { score: number; results: any[] } }) => {
                state.status = 'idle';
                const { score, results } = action.payload;
                state.score = score;
                results.forEach((r) => {
                    const question = state.questions.find((q) => q._id === r.questionId);
                    if (question) {
                        question.correctAnswer = r.correctAnswer;
                        question.isCorrect = r.isCorrect;
                    }
                });
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || 'Failed to submit quiz';
            });
    },
});

export const { setSelectedCategory, setSelectedDifficulty, selectAnswer, resetQuiz } = quizSlice.actions;

export const fetchCategories = createAsyncThunk('quiz/fetchCategories', async () => {
    const response = await axios.get<FrontendCategory[]>('http://localhost:3001/api/categories');
    return response.data;
});

export const startQuiz  = createAsyncThunk('quiz/startQuiz', async (_, { getState }) => {
    const state = getState() as { quiz: QuizState };
    const { selectedCategory, selectedDifficulty } = state.quiz;
    const response = await axios.get<FrontendQuestion[]>(
        `http://localhost:3001/api/quiz?category=${selectedCategory}&difficulty=${selectedDifficulty}`
    );
    return response.data;
});

export const submitQuiz = createAsyncThunk('quiz/submitQuiz', async (_, { getState }) => {
    const state = getState() as { quiz: QuizState };
    const { questions } = state.quiz;
    const answers = questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: q.selectedAnswer,
    }));
    const response = await axios.post<{ score: number; results: any[] }>('http://localhost:3001/api/quiz/score', { answers });
    return response.data;
});

export const store = configureStore({
    reducer: {
        quiz: quizSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
