import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// Array of card images
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
];

function App() {
  // state for deck of cards for each game.
  const [cards, setCards] = useState([]);

  // state for managing number of turns for each game.
  const [turns, setTurns] = useState(0);

  // state for card selections
  const [choiceOne, setChoiceOne] = useState(null);   // first selection
  const [choiceTwo, setChoiceTwo] = useState(null);   // second selection

  // state for disabling cards
  const [disabled, setDisabled] = useState(false);

  // shuffle the cards each time App component is evaluated.
  const shuffleCards = () => {
    // initialize shuffledCards array 
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)    /* compareFunction(a, b) */
      .map((card) => ({ ...card, id: Math.random() }))  /* Spread the card object and assign random id for each object */
    setCards(shuffledCards);
    
    // reset choicse
    setChoiceOne(null);
    setChoiceTwo(null);
    
    // reset turns to 0 for each new game
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare two choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {   // only if two choices have been made
      setDisabled(true);
      if (choiceOne.id !== choiceTwo.id) {  // check that the same card was not clicked twice
        if (choiceOne.src === choiceTwo.src) {  // compare image sources of cards selected
          setCards(prevCards => {   // update the matched property of each card, relying on the previous state
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    // reset choices
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // start the game automagically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Magin Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
