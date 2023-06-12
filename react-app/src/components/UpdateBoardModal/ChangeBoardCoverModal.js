
import OpenModalButton from "../OpenModalButton";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { fetchPinsToday, getPinById } from "../../store/pins";
import { useModal } from "../../context/Modal";
import { updateBoardThunk } from "../../store/boards";
import UpdateBoardModal from ".";
import './ChangeBoardCoverModal.css'



function ChangeBoardCoverModal({ updatedBoardData, board }) {

  const dispatch = useDispatch();
  const history = useHistory()
  const { setModalContent, closeModal } = useModal();
  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const [cover_image, setCoverImage] = useState(updatedBoardData?.cover_image || "")

  const pins = useSelector((state) => state.pins.pins);
  const [pinImages, setPinImages] = useState([]);


  useEffect(() => {
    if (pins) {
      setPinImages(Object.values(pins).filter(pin => board.pins.includes(pin.id)));
    }
  }, [pins])

  const date = new Date();


  function onHover(pin) {
    setHover(true)
    setHoverDiv(pin.image)
  }

  function offHover() {
    setHover(false)
    setHoverDiv("")
  }

  const setBoardCoverImage = async (event) => {
    setCoverImage(hoverDiv)
    const newCoverImage = cover_image
    openUpdateModal(event, hoverDiv)
  }

  const openUpdateModal = (event, newCoverImage) => {
    event.stopPropagation();
    const modalContent = (
      <div>
        <UpdateBoardModal newCoverImage={newCoverImage} pins={pinImages} board={board} />
      </div>
    );
    setModalContent(modalContent);
  };

  return (!pinImages || !pinImages.length ? <h1>Loading...</h1> :
    <>
      <div className="-board-modal-container">
        <h3 className="change-board-new-board-text">Change board cover</h3>
        <div className="change-board-list-container">
          <div className="change-board-board-list">
            {pinImages.map((pin) => {
              return (
                <div className="change-board-modal-pins"
                  style={{
                    backgroundImage: `url(${pin.image})`,

                  }}
                  onMouseEnter={() => onHover(pin)} onMouseLeave={() => offHover()}
                  onClick={setBoardCoverImage}
                >
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="change-board-bottom-done">
      </div>
    </>
  );

}


export default ChangeBoardCoverModal
