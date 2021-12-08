import React, { useState } from 'react';

// firestore
import { projectFirestore } from '../../firebase/config';

// components
import { Link } from 'react-router-dom';

// hooks
import { useTheme } from '../../hooks/useTheme';
import { useHistory } from 'react-router';

// styles
import './RecipeList.css'

// icons
import TrashCan from '../../assets/trashcan.svg'

export default function RecipeList({recipes}) {
  const { color, mode } = useTheme();
  const history = useHistory();

  if (recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found.</p>
      </div>
    );
  }

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete(); 
  }
  
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method}</div>
          <Link to={`/recipes/${recipe.id}`} style={{ background: color, color: '#fff' }}>Cook This</Link>
          <img
            className="delete"
            src={TrashCan}
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  )
}
