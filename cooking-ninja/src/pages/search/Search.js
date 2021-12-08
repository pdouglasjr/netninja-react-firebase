import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

// styles
import './Search.css';

// components
import RecipeList from '../../components/recipe/RecipeList';

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);

  // grab query term
  const query = queryParams.get('q');

  // url
  const url = 'http://localhost:3000/recipes?q=' + query;

  // fetch data
  const { data, isPending, error } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
