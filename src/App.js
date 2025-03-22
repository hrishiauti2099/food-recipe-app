import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h1 style={{ fontSize: '4rem', color: '#FFD700', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Food Recipe App
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
