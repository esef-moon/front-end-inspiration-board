import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';
import axios from 'axios';
// import App from '../App'

const Board = ({selectedBoard}, props) => {
  
  //Render initial address
  const RENDER_URL = 'https://asj-forever-inspiration.onrender.com/boards'

  //create card state, gets updated through api call

  const [cards, setCards] = useState([])


  // get all cards from one board
  const loadCards = (boardId) => {
  
    axios.get(`${RENDER_URL}/${boardId}/cards`)
    .then((response)=> {
      const cardCopy = response.data.map((card)=> {
        return {
          id: card.card_id,
          message: card.message,
          likesCount:  card.likes_count,
        };  
      });
      setCards(cardCopy);
    })

    .catch((error)=>{
      console.log('error', error)
    })

  };
  loadCards(selectedBoard.boardId)
  console.log(cards)
  
  // Move the updateLike function -- double check to ensure same functionality
  const updateLike = (cardId) => {
    console.log('One more like has been added!')
    axios
      .patch(`${RENDER_URL}/cards/${cardId}`)
      .then((result) => {
        const updatedCards = cards.map(card => {
          if (card.id === cardId) {
            return {
              ...card, 
              likesCount: card.likesCount + 1
            }
          }
            return card;
          })
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
      };

      // Create a card function needs to get moved
 const createNewCard = (message) => {
  axios
    .post(
      `${RENDER_URL}/boards/${selectedBoard.board_id}/cards`,
      {message}
    )
    .then((result) => {
      console.log(result);
      // rename camel and snake case props from axios call
      const newCard = {
        id: result.data.card.id,
        message: result.data.card.message,
        likes_count: result.data.card.likes_count,
      };

      setCards([...cards, newCard], () => {
        console.log(this.state.cardsData);
      }); 
    })
    .catch((error) => console.log(error.response.data));
  };

// Move delete card function
  const updateDelete = (cardId) => {
    axios
      .delete(`${RENDER_URL}/cards/${cardId}`)
      .then(() => {})
        const updatedCards = cards.map (card => {
          if (card.id !== cardId) {
            return {...cards}
          }
        })
    setCards(updatedCards)
    .catch((error) => {
      console.error(error.response.data.message);
    });
  };
// Pass in all props to cardlist --> card
  return (
    <section>
      <h2>{props.title}</h2>
      <h4>{props.owner}</h4>
      <span className='card__list'>
        <CardList 
          boardId={props.id} 
          loadCardsProp={props.loadCards}
          createNewCardProp={props.createNewCard}
          updateDeleteProp={props.updateDelete}
          updateLikeProp={props.updateLike}
          cards = {cards}
          createNewCard={createNewCard}
          updateDelete={updateDelete}
          updateLike={updateLike}
        />
      </span>
    </section>
  )
  };

Board.propTypes = {
  board: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    }),
  
  };

export default Board;
