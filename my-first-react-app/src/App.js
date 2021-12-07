import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from './components/EventList';


function App() {
// useState is used for create component states
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([
    {title: "mario's birthday bash", id: 1},
    {title: "bowser's live stream", id: 2},
    {title: "race on moo moo farm", id: 3}
  ]);

  const handleClick = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => {
        return id !== event.id ? true : false;
      });
    });
    console.log(id);
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
        <h2>Terms and Conditions</h2>
        <hr style={{borderColor: "#ffe", borderWidth: "1px"}}/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat. Sollicitudin nibh
        sit amet commodo nulla facilisi nullam vehicula ipsum. Justo nec ultrices dui sapien. Ac ut
        consequat semper viverra nam.</p>
      </Modal>}
      <div>
        <button onClick={() => setShowModal(true)} className="show-btn" >Show Modal</button>
      </div>
    </div>
  );
}

export default App;