import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getAllBoardThunks } from "../../store/boards-mikey";
import { getBoardsByUsername } from "../../store/boards";
import LoadingButton from "../LoadingButton";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import CreateBoardModal from "../CreateBoardModal";
import UpdateBoardModal from "../UpdateBoardModal";
import './FeedPage.css'



function FeedPage() {

  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [hoverBoard, setHoverBoard] = useState(false)
  const [hoverBoardDiv, setHoverBoardDiv] = useState("")


  function onHoverBoard(board) {
    setHoverBoard(true)
    setHoverBoardDiv(board.id)
  }

  function offHoverBoard() {
    setHoverBoard(false)
    setHoverBoardDiv("")
  }

  function viewIndividualBoard(username, name) {
    let nameArr = name.toLowerCase().split(" ")
    let formattedName = nameArr.join("_")
    history.push(`/${username}/${formattedName}`)
  }


  useEffect(() => {
    setTimeout(() => {
      // Assuming you're fetching the boards data here
      if (username) {
        dispatch(getBoardsByUsername(username))
      }

      setIsLoading(false);
    }, 1500);

  }, [dispatch])






  //GET STATE DATA
  const sessionUser = useSelector(state => state.session.user)

  const currentState = useSelector(state => state)


  const username = sessionUser?.username

  const boardsSelector = useSelector((state) => state.boards.currentProfileBoards)


  const boards = Object.values(boardsSelector)
  // const boards = boardsArr[0]




  // Checking for the number of pins in BOARD STATE
  let numberOfPins;

  if (boards) {
    let numberOfPinsStart = 0
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i]
      if (board.pins.length > 0) {
        numberOfPinsStart += board.pins.length
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


  //check if we have any boards in our database or state. If not, we will load the page or not render it at all
  if (typeof boards === 'undefined' || boards.length === 0) {

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

          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              <button className="gallery-photo-button">Save</button>
              <NavLink to="https://www.google.com" target="_blank" className="feed-test-link">
                google.com
              </NavLink>
              <p className="feed-test-board-link">
                Street Wear <span className="arrow-down">&lt;</span>
              </p>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/60/47/d2/6047d21562d5987476b46c752577b714.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/60/47/d2/6047d21562d5987476b46c752577b714.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>


          </div>




          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/6f/a6/e1/6fa6e1cf1d653f0af05500966670b19e.jpg" />
              <button className="gallery-photo-button">Save</button>

            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/a0/10/99/a0109904e0c64c9349af920824161fc0.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/85/00/f6/8500f61d2686c9bc7310c39034c66437.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://cdn.shopify.com/s/files/1/0743/1575/9923/products/b4f15ed3ee7747f39b133a66ba3e2bff-Max_1080x.jpg?v=1683763998" />
              <button className="gallery-photo-button">Save</button>
            </div>


          </div>



          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
              <button className="gallery-photo-button">Save</button>

            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
            </div>
          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/6f/a6/e1/6fa6e1cf1d653f0af05500966670b19e.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            </div>

          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
            </div>

          </div>


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
