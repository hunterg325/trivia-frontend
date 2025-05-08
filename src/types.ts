export interface FrontendCategory {
    id: number;
    name: string;
}

export interface FrontendQuestion {
    _id: string;
    question: string;
    options: string[];
    selectedAnswer?: string | null;
    correctAnswer?: string | null;
    isCorrect?: boolean | null;
}

export interface QuizState {
    categories: FrontendCategory[];
    selectedCategory: number | null;
    selectedDifficulty: string | null;
    questions: FrontendQuestion[];
    score: number | null;
    status: 'idle' | 'loading' | 'error';
    error: string | null;
}
