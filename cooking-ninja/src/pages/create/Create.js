import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
// firestore
import { projectFirestore } from '../../firebase/config';

// styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);  
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();  /* prevent browser from refreshing on data change */
    
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' };
    
    try {
      await projectFirestore.collection('recipes').add(doc);  // finish before continuing
      history.push('/');  // redirect user back to home page
    } catch(err) {
      console.log(err);
    }
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing]);
      console.log(ingredients)
    }

    setNewIngredient([]);
    ingredientInput.current.focus();
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form action="" onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient} 
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map((ingredient) => <em key={ingredient}>{ingredient}, </em>)}</p>
        <label>
          <span>Method:</span>
          <textarea
            type="text"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          />
        </label>
        <label>
          <span>Cook Time:</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>  
      </form>
    </div>
  )
}
