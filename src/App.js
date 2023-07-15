import './App.css';
//import CardList from './components/CardList';
import React, { useState, useEffect } from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
// import BoardList from './components/BoardList';





function App() {

  // setting board state, empty before axios call
  const [boards, setBoards] = useState([
    {id: 0,
    title: '',
    owner: ''}
  ])
// create currentBoard state and selectedBoard state
  const [selectedBoard, setSelectedBoard] = useState({
    id: 0,
    title: '',
    owner: ''
  });

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
  console.log(boards)

  //when app initialized, call our backend 
  //set the value of boards backend on state
  useEffect(()=>{loadBoards()}, [])

  // change selectedBoard function

  const changeSelectedBoard = (boardId) => {
    boards.forEach(board => {
      if (board.id === boardId) {
        setSelectedBoard(board);
      }
    })
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
      .delete(`${RENDER_URL}/${boardId}`)
      .then(() => {
        const newBoards = boards.filter((board) => board.id !== boardId);
        setBoards(newBoards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };
  console.log(boards)
  // select or delete board functions
  const renderBoardList = () => {

    return boards.map((board) => {
      return ( 
        <span >
          <button 
          id={board.board_id} 
          name='board'
          onClick={changeSelectedBoard(board.board_id)}
          >
            {board.title} 
          </button>

          <button
              id={board.board_id}
              name='trash'
              // onClick={deleteBoard(board.board_id)}
            >
              🗑️
          </button>
        </span>
        
      )
    });
  };

  return (
    <div class="page__container">
      <header>
      <section>
          <h1>AJS INSPIRATION BOARD</h1>
          <h2>Board Description!</h2>
        </section>
     
      </header>
      <section class="content__container">
        <section class="boards__container">
          <section class="boards__list" >
              <button 
                onClick={newBoardToggleForm}
              >
                New Board {showHideCards}
              </button>
              {renderBoardList()}
              {/* <BoardList
                boards = { boards }
              /> */}
          </section>
        </section>
        
        <section class="new-board-form__container">
          <NewBoardForm 
            showHideCards={showHideCards} 
            createNewBoard={createNewBoard} 
          />
        </section>
        
        <section>
          <Board 
            selectedBoard={ selectedBoard }
          />
        </section>
      </section>
    </div>
  );
  };

  export default App;



