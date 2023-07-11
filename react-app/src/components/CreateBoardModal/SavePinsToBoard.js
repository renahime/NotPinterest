
import OpenModalButton from "../OpenModalButton";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { fetchPinsToday, getPinById } from "../../store/pins";
import { useModal } from "../../context/Modal";
import './SavePinsToBoard.css'
// import { addPinToBoardThunk, getBoardByName } from "../../store/boards";
import { pinThunk } from "../../store/boards";
import { getAllPinsThunkOld } from "../../store/pins";
import LoadingButton from "../LoadingButton";



function SavePinsToBoardModal({ pinsArr, username, boardName, setChange, change }) {


  //   const dispatch = useDispatch();
  const dispatch = useDispatch()
  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { setModalContent, closeModal } = useModal();
  const history = useHistory()
  const allpins = useSelector(state => state.pins.pins)

  //   // console.log("PINS TODAY SAVE PINS TO BOARD MODAL", pinsToday)

  useEffect(() => {
    // console.log("allpins", allpins)
    // console.log(Object.values(allpins))
    if (!Object.values(allpins).length) {
      dispatch(getAllPinsThunkOld())
    }
      // .then(() => console.log("ALL PINS FETCHED", pinsToday))
      // .catch((error) => console.log("Error fetching pins:", error));
  }, [dispatch]);


  // useEffect(() => {
  //   dispatch(getBoardByName(username, boardName))
  // }, [username])

  // dispatch(fetchPinsToday())
  const currentBoard = useSelector(state => state.boards.singleBoard)
  const currentBoardState = useSelector(state => state.boards.singleBoard)

  const currentState = useSelector(state => state)

  // const pins = useSelector(state => state.pins.pins)


  // const allPins = useSelector(state => state.pins.pins)



  // console.log("ALL PINS SELECTOR", allPins)
  // let allPinsArr = Object.values(allPins)
  // console.log("PINS ARRAY", allPinsArr)


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
    // await dispatch(addPinToBoardThunk(currentBoard.id, pin, pin.id))
    await dispatch(pinThunk(hoverDiv, currentBoard.id))
  }


  // if (Object.keys(images).length === 0) {
  //   console.log("WE ARE IN LOADING STATE")
  //   if (isLoading) {
  //     return (
  //       <LoadingButton
  //         isLoading={isLoading}
  //       // disabled={isLoading}
  //       />
  //     )
  //   }
  // }



  // if (Object.keys(images).length === 0) {
  //   console.log("WE ARE IN LOADING STATE")
  //   if (isLoading) {
  //     return (
  //       <LoadingButton
  //         isLoading={isLoading}
  //       // disabled={isLoading}
  //       />
  //     )
  //   }
  // }
  // if (pinsArr.length == 0) {
  //   pinsArr = [
  //     {
  //       "alt_text": null,
  //       "boards_pinned_in": [
  //         {
  //           "id": 6,
  //           "name": "Casual Outfits"
  //         },
  //         {
  //           "id": 3,
  //           "name": "Summer outfits"
  //         }
  //       ],
  //       "categories": [
  //         "Athleisure"
  //       ],
  //       "created_at": "Sun, 11 Jun 2023 20:29:01 GMT",
  //       "description": "Material: cotton, Fabric: Broadcloth, Collar: O-Neck",
  //       "destination": "https://vivinch.com/no-pain-no-gain-mens-hooded-gym-fitness-tank-top",
  //       "id": 11,
  //       "image": "https://threadterest.s3.us-east-2.amazonaws.com/No+Pain+No+Gain+Mens+Hooded+Tank+Top.jpeg",
  //       "owner_id": 2,
  //       "title": "No Pain No Gain Mens Hooded Tank Top",
  //       "updated_at": "Sun, 11 Jun 2023 20:29:01 GMT",
  //       "user": {
  //         "first_name": "Jane",
  //         "followers": [
  //           "Demo"
  //         ],
  //         "id": 2,
  //         "last_name": "Smith",
  //         "profile_image": null,
  //         "username": "jane"
  //       }
  //     }]
  // }



  return (
    <>
      <div className="save-pins-to-board-modal-container">

        <h3 className="save-pins-to-new-board-text">Save some Pins to your new board</h3>

        <div className="save-pin-list-container">
          {/* <div className="save-pins-board-list" onMouseEnter={handlePinHover} onMouseLeave={handlePinHover}> */}
          <div className="save-pins-board-list" >
            {Object.values(allpins).slice(0, 15).map((pin) => {
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
