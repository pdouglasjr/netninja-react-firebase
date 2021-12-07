import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from './components/EventList';
import NewEventForm from './components/NewEventForm';

function App() {
// useState is used for create component states
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prevEvent) => {
      return [...prevEvent, event];
    });
    setShowModal(false);
  }

  const handleClick = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => {
        return id !== event.id ? true : false;
      });
    });
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const subtitle = "All the latest events in Marioland"

  return (
    <div className="App">
      <Title title="Events in Your Area" subtitle={subtitle} />
      {showEvents && (
        <div>
          <button className="event-list-toggle" onClick={() => {setShowEvents(false)}}>hide events</button>
        </div>
      )}
      {!showEvents &&
        <div>
          <button onClick={() => {setShowEvents(true)}}>show events</button>
        </div>
      }
      {showEvents && <EventList events={events} handleClick={handleClick}></EventList>}
      {showModal && <Modal handleClose={handleClose} isSalesModal={false}>
        <NewEventForm addEvent={addEvent}></NewEventForm>
      </Modal>}
      <div>
        <button onClick={() => setShowModal(true)} className="show-btn" >Add New Event</button>
      </div>
    </div>
  );
}

export default App;