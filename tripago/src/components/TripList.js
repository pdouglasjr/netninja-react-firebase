// import { useState, useEffect, useCallback } from "react";
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

// styles
import './TripList.css';

export default function TripList() {

  const [url, setUrl] = useState(['http://localhost:3000/trips'])
  const { data : trips, isPending, error } = useFetch(url, { type: 'GET' });

  // Create cached version of fetchTrips
  // const fetchTrips = useCallback(async () => {  // Use useCallback with functions
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   setTrips(json);
  // }, [url]);

  // useEffect(() => {
  //   fetchTrips()
  // }, [fetchTrips]);

  // console.log(trips);

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      {isPending && <div className="trip-list loading-message">Loading trips...</div>}
      {error && <div>{error}</div>}
      {!isPending && <ul>
        {trips && trips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>}
      <div className="filters">
        <button onClick={() => {setUrl('http://localhost:3000/trips')}}>
          All Trips
        </button>
        <button onClick={() => {setUrl('http://localhost:3000/trips?loc=america')}}>
          American Trips
        </button>
        <button onClick={() => {setUrl('http://localhost:3000/trips?loc=europe')}}>
          European Trips
        </button>
      </div>
    </div>
  )
}
