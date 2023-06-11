import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { getAllBoardThunks } from "../../store/boards-mikey";
import { getBoardsByUsername } from "../../store/boards";
import LoadingButton from "../LoadingButton";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import CreateBoardModal from "../CreateBoardModal";
import UpdateBoardModal from "../UpdateBoardModal";
import { getAllPinsThunk } from "../../store/pins";
import './FeedPage.css'



function FeedPage() {

  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [hoverBoard, setHoverBoard] = useState(false)
  const [hoverBoardDiv, setHoverBoardDiv] = useState("")
  const [randomizedArrays, setRandomizedArrays] = useState([]);

  let singleBoard = useSelector(state => state.boards.singleBoard)
  let state = useSelector(state => state)
  console.log("SINGLE BOARD INFO on feed page", singleBoard)
  console.log("CURRENT STATE", state)
  console.log("BOARDS", state.boards)



  console.log("HOVER PIN", hoverBoardDiv)



  //for BOARD HOVER
  function onHoverBoard(board) {
    setHoverBoard(true)
    setHoverBoardDiv(board.id)
  }
  function offHoverBoard() {
    setHoverBoard(false)
    setHoverBoardDiv("")
  }



  // if user clicks on board
  function viewIndividualBoard(username, name) {
    let nameArr = name.toLowerCase().split(" ")
    let formattedName = nameArr.join("_")
    history.push(`/${username}/${formattedName}`)
  }



  //FETCH BOARD DATA
  useEffect(() => {
    setTimeout(() => {

      if (username) {
        dispatch(getBoardsByUsername(username))
      }
      setIsLoading(false);
    }, 1500);
  }, [dispatch])


let allPinsArr;

  //GET ALL PINS DATA FOR ARRAY
  console.log("WE ARE TRYING TO GET PINS" ,)
  const allPins = useSelector(state => state)
  if(allPins){
    console.log("WE ARE IN ALL PINS", allPins)
    allPinsArr = Object.values(allPins)
  }else {
    allPinsArr = []
  }



  useEffect(() => {
    console.log("Before dispatch");
    dispatch(getAllPinsThunk())
      .then(() => console.log("ALL PINS FETCHED", allPinsArr))
      .catch((error) => console.log("Error fetching pins:", error));
  }, [dispatch]);




  //GET STATE DATA
  const sessionUser = useSelector(state => state.session.user)
  const currentState = useSelector(state => state)
  const username = sessionUser?.username
  const boardsSelector = useSelector((state) => state.boards.currentUserBoards)
  const boards = Object.values(boardsSelector)
  const [selectedBoard, setSelectedBoard] = useState(boards[0]?.id || "")
  const [selectedBoardDropdown, setSelectedBoardDropdown] = useState(boards[0]?.name || "")

  console.log("SELECETED BOARD DROPDOWN", selectedBoardDropdown)
  console.log("SESSION USER USERNAME", username)
  console.log(sessionUser)
  console.log("GET ALL BOARDS STATE TEST", boardsSelector)
  console.log("GET ALL BOARDS DATA", boards)



  // Randomize Array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // let randomizedArrays;
  const dividedArrays = [];


  //FOR PIN FEED, sepereate all pins into 7 sections
  useEffect(() => {
    if (allPinsArr.length > 0) {
      const dividedBy7 = Math.ceil(allPinsArr.length / 7);
      for (let i = 0; i < allPinsArr.length; i += dividedBy7) {
        const individualSection = allPinsArr.slice(i, i + dividedBy7);
        dividedArrays.push(individualSection);
      }
      if (dividedArrays.length > 0) {
        setRandomizedArrays(shuffleArray(dividedArrays));
      }
      console.log("DIVIDED ARRAYS", dividedArrays);
      console.log("Randomized arrays", randomizedArrays)
    }

  }, [allPinsArr.length]);








  // Checking for the number of pins in BOARD STATE
  let numberOfPins;

  if (boards.length > 0) {
    let numberOfPinsStart = 0
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i]
      console.log("BOARDS PINS LENGTH", board)
      if (board.pins?.length > 0) {
        numberOfPinsStart += board.pins.length
        console.log("NUMBER OF PINS", numberOfPins)
      }
    }
    numberOfPins = numberOfPinsStart
  }




  // our boards container will loop through this array and keep assigning board backgrounds dynamically

  const [boardColors] = useState([
    { backgroundColor: "rgb(233, 212, 212)" },
    { backgroundColor: "rgb(190, 205, 193)" },
    { backgroundColor: "rgb(229, 235, 209)" },
    { backgroundColor: "rgb(244, 230, 219)" },

  ]);


  // control the left and right arrows of the board container.
  const scrollContainerRef = React.useRef(null);

  const handleScrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft - 200,
      behavior: 'smooth' // You can remove this line if you prefer an instant scroll
    });
  };

  const handleScrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft + 200,
      behavior: 'smooth' // You can remove this line if you prefer an instant scroll
    });
  };



  // this is for the select a board dropdown
  const handleBoardChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBoardDropdown(selectedValue);
  };



  //check if we have any boards in our database or state. If not, we will load the page or not render it at all
  if (typeof boards === 'undefined' || boards.length === 0 || allPinsArr.length == 0 || dividedArrays.length == 0) {

    //Loading screen
    if (isLoading) {
      return (
        <LoadingButton
          isLoading={isLoading}
        // disabled={isLoading}
        />
      )
    }
  }


  return (
    <>
      <div className="feed-container">

        {boards.length > 0 ? (

          <>
            <div className="board-container-top-text">
              <div>Hey {sessionUser.first_name}, you have</div>
              <NavLink to={`/${username}`}> {boards.length} boards</NavLink>
              <div>and</div>
              <NavLink to={`/${username}/_created`}>{numberOfPins} pins</NavLink>
              <div>Check them out!</div>
            </div>

            <div className="full-board-container">

              <div className="board-container" ref={scrollContainerRef}>
                <div className="scroll-arrows left-arrow" onClick={handleScrollLeft}>
                  <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className="scroll-arrows right-arrow" onClick={handleScrollRight}>
                  <i className="fa-solid fa-angle-left fa-rotate-180"></i>
                </div>


                {boards.map((board, index) => (

                  <div key={board.id} className="board-top" style={boardColors[index % boardColors.length]} onClick={() => viewIndividualBoard(board.user.username, board.name)} onMouseEnter={() => onHoverBoard(board)} onMouseLeave={() => offHoverBoard()}>
                    {/* <OpenModalButton
                  buttonText={board.name}
                  className="test-open-create-board-modal"
                  modalComponent={<UpdateBoardModal id={board.id} />}
                  onClick={() => history.push(`/boards/${board.id}`)}
                /> */}
                    <div>
                      {board.name}
                    </div>
                  </div>
                ))}

              </div>
            </div>


            <div>
              <label htmlFor="boardSelect">Select a board:</label>
              <select id="boardSelect" onChange={handleBoardChange} value={selectedBoardDropdown}>
                {boards.map((board) => (
                  <option key={board.id} value={board.name}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>
          </>

        ) : (
          <>
            <div className="board-container-top-text">
              <div>Oh no, you have</div>
              <NavLink to={`/${username}`}> {boards.length} boards.</NavLink>
              <div>Let's change that!</div>
              <OpenModalButton
                buttonText="Create Board"
                className="feed-page-create-board"
                modalComponent={<CreateBoardModal username={sessionUser?.username} />}
              />
            </div>
          </>

        )

        }


        {/* <OpenModalButton
          buttonText=<i class="fa-solid fa-plus"></i>
          className="test-open-create-board-modal"
          modalComponent={<CreateBoardModal />}
          style={{ fontSize: '20px' }}
        /> */}







        <div className="feed-test-container">
          {randomizedArrays.map((array, index) => (
            <div key={index} style={{ flex: 1 }}>
              {array.map((item, itemIndex) => (
                <div key={itemIndex} className="feed-test-photo">
                  <img src={item.image} />
                  <button className="gallery-photo-button">Save</button>
                  <NavLink to="/" target="_blank" className="feed-test-link">
                    Test Link
                  </NavLink>
                  <p className="feed-test-board-link">
                    {item.boardName} <span className="arrow-down">&lt;</span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>








        {/*
        <div className="pin-container">

          <div className="gallery-container">

            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
              <p className="gallery-photo-board-text">Clothing</p>
            </div>

          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/474x/60/47/d2/6047d21562d5987476b46c752577b714.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>

            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/6f/a6/e1/6fa6e1cf1d653f0af05500966670b19e.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>


          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>






        </div> */}



      </div >
    </>
  )
}



export default FeedPage;
