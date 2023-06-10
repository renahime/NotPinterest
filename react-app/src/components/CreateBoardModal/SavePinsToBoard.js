
import OpenModalButton from "../OpenModalButton";
import TodayPage from "../TodayPage";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { fetchPinsToday, getPinById } from "../../store/pins";
import { useModal } from "../../context/Modal";
import './SavePinsToBoard.css'
import { addPinToBoardThunk, getBoardByName } from "../../store/boards";
import { pinThunk } from "../../store/boards";
import { getAllPinsThunk } from "../../store/pins";
import LoadingButton from "../LoadingButton";



function SavePinsToBoardModal({ pinsToday, username, boardName, setChange, change }) {


  const dispatch = useDispatch();

  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { setModalContent, closeModal } = useModal();
  const history = useHistory()




  // useEffect(() => {
  //   setTimeout(() => {
  //     // Assuming you're fetching the boards data here
  //     setChange(true)
  //     if (setChange) {
  //       dispatch(getAllPinsThunk)
  //     }

  //     setIsLoading(false);
  //   }, 2000);

  // }, [dispatch])





  console.log("HOVER DIV INFO - PIN", hoverDiv)
  console.log("Pins TODAY", pinsToday)
  // console.log("PINS TODAY SAVE PINS TO BOARD MODAL", pinsToday)

  useEffect(() => {
    console.log("Before dispatch");
    dispatch(getAllPinsThunk())
      .then(() => console.log("ALL PINS FETCHED", pinsToday))
      .catch((error) => console.log("Error fetching pins:", error));
  }, [dispatch, change]);


  useEffect(() => {
    dispatch(getBoardByName(username, boardName))
  }, [username])

  // dispatch(fetchPinsToday())
  const currentBoard = useSelector(state => state.boards.singleBoard)
  const currentBoardState = useSelector(state => state.boards.singleBoard)
  const currentState = useSelector(state => state)
  const allPins = useSelector(state => state.pins.pins)
  console.log("BOARD NAME AND ID", currentBoard)
  console.log("ALL PINS SELECTOR", allPins)
  let allPinsArr = Object.values(allPins)
  console.log("PINS ARRAY", allPinsArr)


  function onHover(pin) {
    setHover(true)
    setHoverDiv(pin)
  }

  function offHover() {
    setHover(false)
    setHoverDiv("")
  }

  // const handlePinHover = (e) => {
  //   const target = e.target;
  //   if (target.classList.contains("save-pins-to-board-modal-pins")) {
  //     if (e.type === "mouseenter") {
  //       // Handle hover in
  //       const pinId = target.dataset.pinId; // Retrieve the pin ID from a data attribute
  //       setHoverDiv(pinId);
  //       setHover(true);
  //     } else if (e.type === "mouseleave") {
  //       // Handle hover out
  //       setHoverDiv("");
  //       setHover(false);
  //     }
  //   }
  // };

  async function addPinToBoard() {
    console.log("BEFORE- CHECK STATE", currentBoardState)
    console.log("CURRENT STATE", currentState)
    console.log("HOVER DIV IN ADD TO PIN FUNCTION", hoverDiv)
    console.log("CURRENT BOARD", currentBoard.id)
    // await dispatch(addPinToBoardThunk(currentBoard.id, pin, pin.id))
    await dispatch(pinThunk(hoverDiv, currentBoard.id))
    console.log("SUCCESS- CHECK STATE", currentBoardState)
    console.log("CURRENT STATE", currentState)

  }

  if (Object.keys(allPins).length === 0) {
    console.log("WE ARE IN LOADING STATE")
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
      <div className="save-pins-to-board-modal-container">

        <h3 className="save-pins-to-new-board-text">Save some Pins to your new board</h3>

        <div className="save-pin-list-container">
          {/* <div className="save-pins-board-list" onMouseEnter={handlePinHover} onMouseLeave={handlePinHover}> */}
          <div className="save-pins-board-list" >
            {allPinsArr.map((pin) => {
              return (


                < div className="save-pins-to-board-modal-pins"
                  data-pin-id={pin.id}
                  onMouseEnter={() => onHover(pin)} onMouseLeave={() => offHover()}
                  style={{ backgroundImage: `url(${pin.image})`, }
                  }
                >
                  <div className="save-pins-to-board-save-button"
                    onClick={() => addPinToBoard()}

                  >Save</div>
                  <div className="save-pins-to-board-modal-text-container">
                    {pin.description}
                  </div>

                </div>


              )
            })}

          </div>
        </div>

        <div className="bottom-done">
          <div className="bottom-done-text" onClick={() => closeModal()}>Done</div>
        </div>



      </div >
    </>
  )

}


export default SavePinsToBoardModal
