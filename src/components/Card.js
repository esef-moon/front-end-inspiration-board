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
        <section className="post-it">
            <p className="post-it">{props.message}</p>
            <div className="post-it">
                <button onClick={onLikeCard}>
                    {props.updateLike ? '❤️' : '🤍'}
                </button>
                <p>{ props.likesCount }</p> 
                <button onClick={onDeleteCard}>
                    Delete Card
                </button>
            </div>
        </section>
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