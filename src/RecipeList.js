import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = 'e3cae5f04fb945b1905e7646d903fab1';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError('');
      try {
        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10&addRecipeInformation=true`;

        if (search) {
          url += `&query=${search}`;
        }

        const response = await axios.get(url);
        setRecipes(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 402) {
          setError('API limit reached. Please try again in 24 hours.');
        } else {
          setError('An error occurred while fetching data. Please try again later.');
        }
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [search]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="recipe-list">
      <h2> </h2>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {loading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <ul className="recipe-grid">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="recipe-item"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <p className="recipe-title">{recipe.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeList;
