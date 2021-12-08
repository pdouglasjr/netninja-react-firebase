import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

// hooks
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';

import { projectFirestore } from '../../firebase/config';

// styles
import './Recipe.css';

export default function Recipe() {
  // get URL parameters
  const { id } = useParams();

  // get routing history
  const history = useHistory();

  // grab ui mode
  const { mode } = useTheme();
 
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // runs only once
  useEffect(() => {
    setIsPending(true);

    // update data if firestore collection document changes
    const unsub = projectFirestore.collection ('recipes').doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setIsPending(false);
        setRecipe(doc.data());
      } else {
        setIsPending(false);
        setError('Could not find that recipe.');
      }
    });

    // unsubscribe 
    return () => unsub();
  }, [id]);

  // update 
  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'something completely different'
    });
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <div> {/* don't need a div element here, a fragment will suffice*/}
          <h2 className="page-title">{recipe.title}</h2>
          <p className="cook-time">Takes {recipe.cookingTime} to cook.</p>
          <ul className="ingredients">
            {recipe.ingredients.map((ingredient, key) => (
              <li key={key} className="ingredient">
                <span>{ingredient.quantity}{ingredient.measurement} {ingredient.item}</span>
              </li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={() => handleClick()}>Update Recipe</button>
        </div>
      )}
    </div>
  )
}