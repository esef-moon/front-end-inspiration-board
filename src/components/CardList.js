import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
// import NewCardForm from './NewBoardForm';
import './CardList.css';

const CardList = (props) => {
    return (
      <div class="cards"> 
        {props.cards.map((card) => (
          <Card
            key={`${card.id}-${card.board_id}`}
            id={ card.id }
            board_id={card.board_id}
            likesCount={ card.likesCount }
            message={ card.message }
            updateLike={ props.updateLike } 
            updateDelete={ props.updateDelete }
          />
        ))}
      </div>
    );
  };
  
  CardList.propTypes = {
      cards: PropTypes.arrayOf(
          PropTypes.shape({
              id: PropTypes.number.isRequired,
              board_id: PropTypes.number.isRequired,
              likesCount: PropTypes.number.isRequired,
              message: PropTypes.string.isRequired,
          })
      ),
      updateLike: PropTypes.func,
      updateDelete: PropTypes.func,
      loadCards: PropTypes.func.isRequired,
      createNewCard: PropTypes.func.isRequired,
  };
export default CardList;