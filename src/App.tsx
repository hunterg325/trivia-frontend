import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import {Quiz} from "./components/Quiz";
import {CategorySelector} from "./components/CategorySelector";
import {Results} from "./components/Results";


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
