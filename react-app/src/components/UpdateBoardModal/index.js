import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateUserBoardThunk } from "../../store/session";
import { useHistory } from 'react-router-dom'
import { clearSingleBoard } from "../../store/boards";
import ChangeBoardCoverModal from "./ChangeBoardCoverModal";
import { deleteBoardSessionThunk } from "../../store/session";

import './UpdateBoardModal.css'
import OpenModalButton from "../OpenModalButton";


function UpdateBoardModal({ id, newCoverImage, board, userBoardsArr }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setModalContent, closeModal } = useModal();

  const user = useSelector((state) => state.sessionUser);

  //set form data
  const [name, setName] = useState(board?.name);
  const [description, setDescription] = useState(board?.description);
  const [isPrivate, setIsPrivate] = useState(board?.private);
  const [cover_image, setCoverImage] = useState(
    newCoverImage ? newCoverImage : board?.cover_image
  );

  // when we click on Board Cover we need to open up modal to save pins to board.
  const openModal = () => {
    const modalContent = (
      <div>
        <ChangeBoardCoverModal updatedBoardData={updatedBoardData} board={board} />
      </div>
    );
    setModalContent(modalContent);
  };



  const handlePrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const disabledButton = name === "";
  const onDelete = async (e) => {
    let deletedBoard = await dispatch(deleteBoardSessionThunk(board.id))
    if (deletedBoard.errors) {
      console.log(deletedBoard)
    } else {
      closeModal()
    }
  };

  //updated data that we will send to the thunk
  const updatedBoardData = {
    name,
    private: isPrivate,
    description: description,
    cover_image: cover_image
  };


  // on Submit we update the new Board data and then we redirect user to their new board page
  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    // await dispatch(updateBoardThunk(updatedBoardData, id))
    if (name) {
      for (let board of userBoardsArr) {
        if (name == board.name) {
          validationErrors.name = "Ooops! You already have this board name."
        }
      }
      if (name.length > 50) {
        validationErrors.name = "Ooops! This title is getting long. Try trimming it down."
      }
    }
    if (description) {
      if (description.length > 225) {
        validationErrors.description = "Ooops! This description is getting long. Try trimming it down."
      }
    }
    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    let updatedBoard = await dispatch(updateUserBoardThunk(updatedBoardData, board.id))
    const boardName = updatedBoardData.name.split(' ').join('_').toLowerCase()
    if (updatedBoard.errors) {
      setErrors(updatedBoard.errors)
      return
    } else {
      closeModal()
    }
  };

  console.log(errors);

  return (
    <>
      <div className="edit-board-modal-container">
        <div className="edit-board-modal-header">
          Edit board
        </div>
        <form style={{ maxHeight: '100%', maxWidth: '100%' }} onSubmit={onSubmit}>
          {/* <div className="edit-board-cover-image-plus-sign">+</div> */}
          {cover_image[0] ? <div className="edit-board-cover-image-container">
            <div className="edit-board-cover-image-text">Board cover</div>
            <div className="edit-board-cover-image" onClick={openModal}>
              <img src={cover_image} className="edit-board-cover-image" />
            </div>
          </div>
            : board.pins.length ? <div className="edit-board-cover-image-container">
              <div className="edit-board-cover-image-text">Board cover</div>
              <div className="edit-board-cover-image" onClick={openModal}>
                <img src='https://static-00.iconduck.com/assets.00/plus-square-icon-2048x2048-63y4iawk.png' className="edit-board-cover-image" />
              </div>
            </div> : null}
          <label className="edit-board-modal-name">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="edit-board-modal-name-input"
            ></input>
            <p>{!name ? 100 : 100 - name.length}</p>
            <p style={{ color: "red" }} >{(name && name.length > 100) ? "Ooops, this name is too long" : null}</p>
            <p style={{ color: "red" }}>{errors.name ? (errors.name) : null}</p>


          </label>
          <label className="edit-board-modal-description">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your board about?"
              className="edit-board-modal-description-input"
            ></textarea>
            <p>{!description ? 225 : 225 - description.length}</p>
            <p style={{ color: "red" }} >{(description && description.length > 225) ? "Ooops, this description is too long" : null}</p>
          </label>
          <label>
            <p className="edit-board-settings">Settings</p>
            <div className="edit-board-modal-flex-row">
              <input type="checkbox" checked={isPrivate} onChange={handlePrivateChange} className="edit-board-checkbox-input" />
              <div>
                <p className="edit-board-modal-private-text bold">Keep this board secret</p>
                <p className="edit-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
              </div>
            </div>
          </label>
          <button className="edit-board-modal-create-button" disabled={disabledButton} >
            Done
          </button>
          <div className="edit-board-delete-text-bottom-container" >
            <p className="edit-board-action">Action</p>
            <h2 className="edit-board-delete-text" onClick={onDelete}>Delete Board
              {/* <OpenModalButton
                  buttonText="Delete Board"
                  className="dropdown-item"
                  modalComponent={<DeleteBoardModal id={id} user={sessionUser} />}
                /> */}
            </h2>
            <p className="edit-board-delete-warning">Delete this board and all its Pins forever.</p>
            <br></br>
            <p className="edit-board-delete-warning">You can't undo this!</p>
          </div>

        </form>
      </div>

    </>
  )
}


export default UpdateBoardModal
