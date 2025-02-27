import './App.css';
//import CardList from './components/CardList';
import React, { useState, useEffect } from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import NewCardForm from './components/NewCardForm';
// import BoardList from './components/BoardList';

function App() {
  const emptyBoard = { board_id: 0, title: '', owner: '' };

  // setting board state, empty before axios call
  const [boards, setBoards] = useState([emptyBoard]);

  // create currentBoard state and selectedBoard state
  const [selectedBoard, setSelectedBoard] = useState(emptyBoard);

  // create the showHideCards state 
  const [showHideCards, setShowHideCards] = useState('+')

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
  //create card state, gets updated through api call
  const [cards, setCards] = useState([])
   // get all cards from one board
   
  const loadCards = (boardId) => {
    console.log(`Loading cards for board ${boardId}!`);
    axios
      .get(`${RENDER_URL}/${boardId}/cards`)
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
    console.log(selectedBoard);
    if (selectedBoard) {
      loadCards(selectedBoard.board_id);
    }
  }, [selectedBoard]);


  //when app initialized, call our backend 
  //set the value of boards backend on state
  useEffect(()=>{loadBoards()}, [])

  // change selectedBoard function
  const changeSelectedBoard = (boardId) => {
    const board = boards.find((board) => { return board.board_id === boardId }); 
    console.log(`selectedBoard: ${board.board_id}`)
    setSelectedBoard(board);
  };

  // create newBoard toggle form
  const newBoardToggleForm = () => {
    if (showHideCards === '+') {
      setShowHideCards('-');
    } else {
      setShowHideCards('+');
    }
  };

  // create NewBoard axios call
  const createNewBoard = (newBoardInfo) => {
    const updateNewBoardInfo = {
      ...newBoardInfo
    };

    axios
      .post(`${RENDER_URL}`, updateNewBoardInfo)
      .then(() => {
        // update the Boards state to refresh the page
        const newBoardsArray = [...boards];
        newBoardsArray.push(newBoardInfo);
        setBoards(newBoardsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  // create deleteBoard axios call

  const deleteBoard = (boardId) => {
    axios
      .delete(`${RENDER_URL}/${boardId}/delete`)
      .then(() => {
        const newBoards = boards.filter((board) => board.board_id !== boardId);
        setBoards(newBoards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  // select or delete board functions
  const renderBoardList = () => {
    return boards.map((board) => {
      const isSelected = board.board_id === selectedBoard.board_id;
      console.log(isSelected, board, board.board_id, selectedBoard, "hiii")
      return ( 
        <span key={board.board_id}>
          <button 
            id={board.board_id} 
            name='board'
            className="board-item"
          >

           <button
            className={`selection-box ${isSelected ? 'selected' : ''}`}
            onClick={() => changeSelectedBoard(board.board_id)}
          >

            {isSelected ? '●' : '○'}

          </button>

            {board.title} 

            <button
            id={board.board_id}
            name='trash'
            onClick={() => deleteBoard(board.board_id)}
            className='trash-can'
          >
            🗑️
          </button>
          </button>

          
        </span>
        
      )
    });
  };

  // Create a new card to a board axios call
  const postCard = (newCardData) => {
    axios
    .post(`${RENDER_URL}/${selectedBoard.board_id}/cards`, newCardData)
    .then((result) => {
      console.log(result.data);
      loadBoards();
      loadCards(selectedBoard.board_id);
    })
    .catch((error) => {
      console.log(error);
    });
    };
  

  return (
    <div className="page__container">
      <header className="AJS__logo">
        <section>
          <h1>AJS INSPIRATION BOARD</h1>
        </section>
      </header>
      <section className="content__container">
        <section className="boards__container">
          <section className="boards__list" >
              <h3> Board List</h3>
              {renderBoardList()}
          </section>
        </section>
        
          <section class="new-board-form__container">
            <NewBoardForm 
              showHideCards={showHideCards} 
              createNewBoard={createNewBoard} 
            />
          </section>
      
          <section className="card-form__container">
            <div>
            <NewCardForm addCard={postCard} 
            />
            </div>
          </section>
      </section>
      {/* if selected board exists display title and owner, else display Please select board  */}
      <section className="selected-board-title">
          {selectedBoard.board_id ? (
            <>
              <h2>{selectedBoard.title}</h2>
              <h3> Owner: {selectedBoard.owner}</h3>
            </>
          ) : (
            <h2>Please select a board</h2>
          )}
      </section>
      <section class="card-list">
     
          <Board selectedBoard={ selectedBoard } 
          loadCards = {loadCards}
          cards = {cards}
          setCards = {setCards} />
        </section>
    </div>
  );
  };

  export default App;



