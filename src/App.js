import './App.css';
import CardList from './components/CardList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewBoardForm from './components/NewBoardForm';

// create currentBoard state and selectedBoard state
// create the showHide state
// change currentBoard function
// create newBoard toggle form
// create NewBoard axios call
// create deleteBoard axios call
// create function to add buttons for changing/selecting and deleting boards
// 



function App() {
  // setting board state, empty before axios call
  const [boards, setBoards] = useState([])

  //create card state, gets updated through api call
  const [cards, setCards] = useState([])

  //Render initial address
  const RENDER_URL = 'https://asj-forever-inspiration.onrender.com/boards'

  // get all boards from render
  const loadBoards = () => {
    axios.get(RENDER_URL)
    .then((response)=> {
      const initialBoardData = [];
      response.data.forEach((board) => {
        initialBoardData.push(board);
      });
      
      setBoards(initialBoardData)
    })
    .catch((error)=>{
      console.log('error', error)
    })

  }

  // get all cards from one board
  const loadCards = (boardId) => {
    axios.get(`${RENDER_URL}/${boardId}/cards`)
    .then((response)=> {
      // const initialCardData = [];
      const cardCopy = response.data.map((card)=> {
        return {
          id: card.card_id,
          message: card.message,
          likesCount:  card.likes_count,
        };  
      });
      setCards(cardCopy);
    })
      // response.data.forEach((card) => {
      //   initialCardData.push(card);
      // });
    //   setCards(initialCardData)
    // })
    .catch((error)=>{
      console.log('error', error)
    })

  }


  //when app initialized, call our backend 
  //set the value of animals backend on state
  useEffect(()=>{loadBoards()}, [])

  const updateLike = (cardId) => {
    console.log('One more like has been added!')


    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        return {
          ...card, 
          likesCount: card.likesCount + 1
        }
      }
        return card;
      });
    setCards(updatedCards);
  }

    const updateDelete = (cardId) => {
      const updatedCards = cards.map (card => {
        if (card.id !== cardId) {
          return {...cards}
        }
      });
      setCards(updatedCards)
    }

    // const createNewCard = ({message, likes_count, id}) => {
    //   console.log("Inside app.js & createNewAnimal Function")
    //   //rename snake to camel case for id and likes count
    //   const updatedCardInfo = {
    //     ...newCardInfo, 
    //     "id": boardId, 
    //     "likes_count": likesCount
    //   }  

      //api post call to add newcard to a board and backend
      
      axios.post(`${RENDER_URL}/${id}/cards`, updatedCardInfo)
      .then(() => {
        // make another get request to refresh page OR
        loadCards();
      })
      .catch((error)=> {
        console.log('error', error)
      })
    }
  return (
  <section>
    <h1> AJS INSPIRATION BOARD</h1>
    {/* Make a new Board form */}
    {/* Return showHide */}
    {/* Return createNewBoard */}
  <NewBoardForm createNewCard={createNewCard} />
  {/* Pass down current board */}
  <Board 
    cardData={card} 
    updateLike={updateLike}
    updateDelete={updateDelete}
    />


  </section>
  );
}

export default App;
