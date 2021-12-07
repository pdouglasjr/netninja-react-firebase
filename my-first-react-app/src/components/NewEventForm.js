// import './NewEventForm.css';
import { useState } from 'react';
import styles from './NewEventForm.module.css';

export default function NewEventForm({ addEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('manchester');

  const resetForm = () => {
    setTitle('');
    setDate('');
    setLocation('');
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent browser from refreshhing
  
    const event = {
      title: title,
      date: date,
      location: location,
      id: Math.floor(Math.random() * 1000000)
    }
  
    console.log(event);

    addEvent(event);
    resetForm();
  }

  return (
    <form className={styles["new-event-form"]} onSubmit={handleSubmit}>
      <label>
        <span>Event Title:</span>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}/>
      </label>
      <label>
        <span>Event Date:</span>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}/>
      </label>
      <label>
        <span>Event Location</span>
        <select onChange={(e) => setLocation(e.target.value)}>
          <option value="manchester">Manchester</option>
          <option value="london">London</option>
          <option value="cardiff">Cardiff</option>
        </select>
      </label>
      <button>Submit</button>
      <p onClick={resetForm}>Reset the Form</p>
    </form>
  )
}
