
import OpenModalButton from "../OpenModalButton";
import TodayPage from "../TodayPage";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { fetchPinsToday, getPinById } from "../../store/pins";
import { useModal } from "../../context/Modal";
import './SavePinsToBoard.css'
import { addPinToBoardThunk, getBoardByName } from "../../store/boards";
import { pinThunk } from "../../store/boards";



function SavePinsToBoardModal({ pinsToday, username, boardName }) {


  const dispatch = useDispatch();

  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const history = useHistory()

  console.log("HOVER DIV INFO - PIN ID", hoverDiv)
  console.log("Pins TODAY", pinsToday)
  // console.log("PINS TODAY SAVE PINS TO BOARD MODAL", pinsToday)


  useEffect(() => {
    dispatch(getBoardByName(username, boardName))
  }, [username])

  // dispatch(fetchPinsToday())
  const currentBoard = useSelector(state => state.boards.singleBoard)
  const currentBoardState = useSelector(state => state.boards.singleBoard)
  const currentState = useSelector(state => state)
  console.log("BOARD NAME AND ID", currentBoard)


  function onHover(pin) {
    setHover(true)
    setHoverDiv(pin.id)
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

  async function addPinToBoard(pin) {
    console.log("BEFORE- CHECK STATE", currentBoardState)
    console.log("CURRENT STATE", currentState)
    // await dispatch(addPinToBoardThunk(currentBoard.id, pin, pin.id))
    await dispatch(pinThunk(pin.id, currentBoard.id))
    console.log("SUCCESS- CHECK STATE", currentBoardState)
    console.log("CURRENT STATE", currentState)

  }


  return (
    <>
      <div className="save-pins-to-board-modal-container">

        <h3 className="save-pins-to-new-board-text">Save some Pins to your new board</h3>

        <div className="save-pin-list-container">
          {/* <div className="save-pins-board-list" onMouseEnter={handlePinHover} onMouseLeave={handlePinHover}> */}
          <div className="save-pins-board-list" >
            {pinsToday.map((pin) => {
              return (


                < div className="save-pins-to-board-modal-pins"
                  data-pin-id={pin.id}
                  onMouseEnter={() => onHover(pin)} onMouseLeave={() => offHover()}
                  style={{ backgroundImage: `url(${pin.image})`, }
                  }
                >
                  <div className="save-pins-to-board-save-button"
                    onClick={() => addPinToBoard(pin)}

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
          <div className="bottom-done-text">Done</div>
        </div>



      </div >
    </>
  )

}


export default SavePinsToBoardModal
