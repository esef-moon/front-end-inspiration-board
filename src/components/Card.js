import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {

    const onLikeCard = () => {
        console.log('Card like toggle working');
        props.updateLike(props.id);
    };

    const onDeleteCard = () => {
        console.log('Card deleted properly');
        props.updateDelete(props.id);
    };

    return (
        <div className="card-component">
           
            <p className="post-it">{props.message}</p>
            <div className='like-delete'>
                <section className="like-section"> 
                    <button onClick={onLikeCard}>
                        {props.updateLike ? '❤️' : '🤍'} { props.likesCount }
                    </button>
                </section>
                
                <button onClick={onDeleteCard}  className="delete-button">
                    Delete Card
                </button>
            </div>
   
        </div>
        
    )
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    updateLike: PropTypes.func.isRequired,
    likesCount: PropTypes.number.isRequired,
    updateDelete: PropTypes.func.isRequired
};

export default Card;