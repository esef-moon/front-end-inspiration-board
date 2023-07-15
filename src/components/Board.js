import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import CardList from './CardList';
import axios from 'axios';
// import App from '../App'

const Board = (props) => {
  //Render initial address
  const RENDER_URL = 'https://asj-forever-inspiration.onrender.com/'

  //create card state, gets updated through api call
  const [cards, setCards] = useState([])

  // get all cards from one board
  const loadCards = (boardId) => {
    console.log(`Loading cards for board ${boardId}!`);
    axios
      .get(`${RENDER_URL}/boards/${boardId}/cards`)
      .then((response)=> {
        const cardCopy = response.data.map((card)=> {
          return {
            id: card.card_id,
            message: card.message,
            likesCount:  card.likes_count,
            board_id: card.board_id
          };  
        });
        setCards(cardCopy);
      })

      .catch((error)=>{
        console.log('error', error)
      })
  };

  useEffect(() => {
    console.log(props);
    if (props.selectedBoard) {
      loadCards(props.selectedBoard.board_id);
    }
  }, [props.selectedBoard]);
  
  // Move the updateLike function -- double check to ensure same functionality
  const updateLike = (cardId) => {
    console.log('One more like has been added!')
    axios
      .patch(`${RENDER_URL}/cards/${cardId}/like`)
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
      `${RENDER_URL}/boards/${props.selectedBoard.board_id}/cards`,
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
      .then(() => {
        const updatedCards = cards.filter ((card) => card.id !== cardId);
        setCards(updatedCards);
  })
    .catch((error) => {
      console.log(error);
      // console.error(error.response.data.message);
    });
  };

  // Pass in all props to cardlist --> card
  return (
    <section>
      <h2>{props.title}</h2>
      <h4>{props.owner}</h4>
      <span className='card__list'>
        <CardList 
          board_id={props.id} 
          loadCards={loadCards}
          cards={cards}
          createNewCard={createNewCard}
          updateDelete={updateDelete}
          updateLike={updateLike}
        />
      </span>
    </section>
  )
  };

Board.propTypes = {
  selectedBoard: PropTypes.shape({
    board_id: PropTypes.number.isRequired,
  })
};

export default Board;
