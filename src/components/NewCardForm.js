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
    <section>
      <form onSubmit={handleSubmit} >
        <div>
        <label htmlFor='message'>Message:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={cardFormData.message}
            onChange={updatePreview}
          />
        </div>
        <p>Preview:</p>
        <div id="preview">{cardFormData.message}</div>
        <input type="submit" value="submit" onClick={handleSubmit}/>
      </form>
    </section>
  );
};

NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default NewCardForm;
