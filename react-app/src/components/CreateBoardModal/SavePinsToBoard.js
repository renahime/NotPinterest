import OpenModalButton from "../OpenModalButton";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './SavePinsToBoard.css'
// import { addPinToBoardThunk, getBoardByName } from "../../store/boards";
import { pinThunk } from "../../store/boards";
import { getAllPinsThunkOld } from "../../store/pins";
import LoadingButton from "../LoadingButton";
import './SavePinsToBoard.css'



function SavePinsToBoardModal({ board }) {
  const dispatch = useDispatch()
  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { setModalContent, closeModal } = useModal();
  const history = useHistory()
  const allpins = useSelector(state => state.pins.pins)



  useEffect(() => {
    if (!Object.values(allpins).length) {
      dispatch(getAllPinsThunkOld())
    }
    // .then(() => console.log("ALL PINS FETCHED", pinsToday))
    // .catch((error) => console.log("Error fetching pins:", error));
  }, [dispatch]);

  // If we hover over a pin we want to save the pin ID to the state incase a user clicks that pin
  function onHover(pin) {
    setHover(true)
    setHoverDiv(pin)
  }

  function offHover() {
    setHover(false)
    setHoverDiv("")
  }



  // add pin to our state if clicked
  async function addPinToBoard() {
    await dispatch(pinThunk(hoverDiv, board.id))
  }





  return (
    <>
      <div className="save-pins-to-board-modal-container">
        <h3 className="save-pins-to-new-board-text">Save some Pins to your new board</h3>
        <div className="save-pin-list-container">
          <div className="save-pins-board-list" >
            {Object.values(allpins).slice(0, 15).map((pin) => {
              return (
                <div
                  className="change-board-modal-pins"
                  data-pin-id={pin.id}
                  onMouseEnter={() => onHover(pin)}
                  onMouseLeave={() => offHover()}
                  style={{ backgroundImage: `url(${pin.image})` }}
                >
                  <div
                    className="save-pins-to-board-save-button"
                    onClick={() => addPinToBoard()}
                  >Save</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="bottom-done">
          <div
            className="bottom-done-text"
            onClick={() => closeModal()}>Done</div>
        </div>
      </div >
    </>
  )
}


export default SavePinsToBoardModal
