
import OpenModalButton from "../OpenModalButton";
import TodayPage from "../TodayPage";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { fetchPinsToday, getPinById } from "../../store/pins";
import { useModal } from "../../context/Modal";
import { updateBoardThunk } from "../../store/boards";
import UpdateBoardModal from ".";
import './ChangeBoardCoverModal.css'



function ChangeBoardCoverModal({ pinImages, updatedBoardData,id,username }) {


  const dispatch = useDispatch();
  const history = useHistory()
  const { setModalContent, closeModal } = useModal();
  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const [cover_image, setCoverImage] = useState(updatedBoardData?.cover_image || "")


  useEffect(() => {

  })
  // console.log("PIN HOVER DIV", hoverDiv)
  // console.log("updatedBoardData",  updatedBoardData)
  // console.log("cover image", cover_image)

  let pinsTodayObj = useSelector(state => state.pins.todayPins)
  let stateTest = useSelector(state => state)

  // console.log("STATE TEST", stateTest)



  // let pinsToday
  // if (pinImages) {
  //   // pinsToday = shuffle(Object.values(pinsTodayObj))
  //   pinsToday = pinImages
  //   // dbLatestDate = pinsToday[0].created_at
  // }
  const date = new Date();



  const month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();
  let day = date.getDate();
  useEffect(() => {
    // dispatch(fetchPinsToday())
  }, [dispatch])


  function onHover(pin) {
    setHover(true)
    setHoverDiv(pin)
  }

  function offHover() {
    setHover(false)
    setHoverDiv("")
  }

  const setBoardCoverImage= async(event) => {
    setCoverImage(hoverDiv)
    console.log("NEW COVER IMAGE",cover_image)
    // console.log("UPDATED BOARD COVER IMAGe", updatedBoardData)
    // updatedBoardData.cover_image = cover_image
    const newCoverImage = cover_image
    // console.log("UPDATED BOARD COVER IMAGe NEW NEW", updatedBoardData)
    // console.log("UPDATED BOARD COVER IMAGe NEW NEW", newCoverImage)
    // await dispatch(updateBoardThunk(updatedBoardData, id));
openUpdateModal(event, hoverDiv)

  }

  const openUpdateModal = ( event,newCoverImage) => {
    event.stopPropagation();
    const modalContent = (
      <div>
       <UpdateBoardModal id = {id} username={username}  newCoverImage ={newCoverImage}/>
      </div>
    );
    setModalContent(modalContent);
  };




  return (
    <>
      <div className="-board-modal-container">
        <h3 className="change-board-new-board-text">Change board cover</h3>
        <div className="change-board-list-container">
          <div className="change-board-board-list">
            {pinImages.map((pin) => {
              return (
                <div className="change-board-modal-pins"
                  style={{
                    backgroundImage: `url(${pin})`,

                  }}
                  onMouseEnter={() => onHover(pin)} onMouseLeave={() => offHover()}
                  onClick={setBoardCoverImage}
                >
                  <div className="change-board-modal-text-container">
                    hello
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="change-board-bottom-done">
        {/* <div className="change-board-bottom-done-text" onClick={closeModal}></div> */}
      </div>
    </>
  );

}


export default ChangeBoardCoverModal
