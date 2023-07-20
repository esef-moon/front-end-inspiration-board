import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewCardForm.css";

const INITIAL_FORM_DATA = {
  message: "",
  likes_count: 0,
};

const NewCardForm = ({ addCard }) => {
  const [cardFormData, setCardFormData] = useState(INITIAL_FORM_DATA);

  const updatePreview = (event) => {
    const newFormData = {
      ...cardFormData,
      [event.target.name]: event.target.value,
    };
    setCardFormData(newFormData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("we're in handleSubmit");
    addCard(cardFormData);

    setCardFormData(INITIAL_FORM_DATA);
  };
  return (
    <section className="cardform__container">
      <h3 className="create-card-title"> Create Card </h3>
      <form onSubmit={handleSubmit} className="cardform" >
        <div className="message">
        <label htmlFor='message'>Message:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={cardFormData.message}
            onChange={updatePreview}
          />
        </div>
        <p className="preview-title">Preview:</p>
        <div className="preview">{cardFormData.message}</div>
        <input type="submit" value="submit" onClick={handleSubmit} className="submit"/>
      </form>
    </section>
  );
};

NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default NewCardForm;
