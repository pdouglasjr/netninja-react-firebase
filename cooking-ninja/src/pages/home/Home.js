import React from 'react'

// styles
import './Home.css'

// hooks
import { useFetch } from '../../hooks/useFetch'
import { useState, useEffect } from 'react';

// components
import RecipeList from '../../components/recipe/RecipeList';

// firestore
import { projectFirestore } from '../../firebase/config';

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // grab firestore recipe collection
  useEffect(() => {
    setIsPending(true);

    // use .onSnapshot for real-time data pulls
    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
      if (snapshot.empty) {  // check if there are existing documents
        setError('No recipes available');
        setIsPending(false);
      } else {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()});
        });
        
        // set data and pending status
        setData(results);
        setIsPending(false);
      }
    }, (err) => {
      setError(err.message);
      setIsPending(false);
    })

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}