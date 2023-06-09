import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateBoardThunk } from "../../store/boards";
import { useHistory } from 'react-router-dom'
// import { clearSingleBoard } from "../../store/boards";
import ChangeBoardCoverModal from "./ChangeBoardCoverModal";
// import { deleteBoardSessionThunk } from "../../store/session";
import { getPinsForBoard, clearBoardPins } from "../../store/pins";
import UpdateDeleteBoardModal from "./DeleteBoardModal";
import './UpdateBoardModal.css'
import OpenModalButton from "../OpenModalButton";


function UpdateBoardModal({ id, newCoverImage, board, boardPage, updatedBoard, username }) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPinsForBoard(id))
    return (() => clearBoardPins())
  }, [dispatch, board])

  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([""]);
  const { setModalContent, closeModal } = useModal();
  const boardPins = useSelector(state => state.pins.currentBoardPins)
  const userBoards = useSelector(state => state.boards.currentUserBoards)



  //set form data
  const [name, setName] = useState(updatedBoard && Object.keys(updatedBoard).length ? updatedBoard.name : board.name);
  const [description, setDescription] = useState(updatedBoard && Object.keys(updatedBoard).length ? updatedBoard.description : board.description);
  const [isPrivate, setIsPrivate] = useState(updatedBoard && Object.keys(updatedBoard).length ? updatedBoard.private : board.private);
  const [cover_image, setCoverImage] = useState(
    board.cover_image ? board.cover_image : [""]
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

  const handlePrivateChange = async (e) => {
    await setIsPrivate(e.target.checked)
  };

  useEffect(() => {
  }, [isPrivate]);

  const disabledButton = name === "";
  const onDelete = async (e) => {
    setModalContent(<UpdateDeleteBoardModal id={id} boardPage={boardPage} username={username} />)
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
      for (let boards of Object.values(userBoards)) {
        if (boards) {
          if (name == boards.name && boards.id != board.id) {
            validationErrors.name = "Ooops! You already have this board name."
          }
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

    let changeBoard = {
      name,
      private: isPrivate,
      description: description,
      cover_image: newCoverImage ? newCoverImage : cover_image
    }

    let updatedBoard = await dispatch(updateBoardThunk(changeBoard, board.id))


    if (updatedBoard) {
      if (boardPage) {
        // const formattedBoardName = changeBoard.name.replace(/\s+/g, "_"); // Replace spaces with underscore
        // const encodedBoardName = encodeURI(updatedBoard.name);
        history.push(`/${username}/${changeBoard.name}`);
      }
      closeModal()

    }

  };

  let imageDisplay = "https://static-00.iconduck.com/assets.00/plus-square-icon-2048x2048-63y4iawk.png"

  if (newCoverImage) {
    imageDisplay = newCoverImage
  } else if (cover_image[0]) {
    imageDisplay = cover_image[0]
  }

  return (
    <>
      <div className="edit-board-modal-container">
        <div className="edit-board-modal-header">
          Edit board
        </div>
        <form className="edit-board-from" style={{ maxHeight: '100%', width: '100%' }} onSubmit={onSubmit}>
          {/* <div className="edit-board-cover-image-plus-sign">+</div> */}
          <div>
            {/* {cover_image[0] ?  */}
            <div className="edit-board-cover-image-container">
              <div className="edit-board-cover-image-text">Board cover</div>
              <div className="edit-board-cover-image" onClick={openModal}>
                <img src={imageDisplay} className="edit-board-cover-image" />
              </div>
            </div>
            {/* : Object.values(boardPins) ? <div className="edit-board-cover-image-container">
                <div className="edit-board-cover-image-text">Board cover</div>
                <div className="edit-board-cover-image" onClick={openModal}>
                  <img src='https://static-00.iconduck.com/assets.00/plus-square-icon-2048x2048-63y4iawk.png' className="edit-board-cover-image" />
                </div>
              </div> : null */}
            <label className="edit-board-modal-name">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="edit-board-modal-name-input"
              ></input>
              <p className="edit-board-text">{100 - name?.length}</p>
              <p className="edit-board-text" style={{ color: "red" }} >{(name?.length > 100) ? "Ooops, this name is too long" : null}</p>
              <p className="edit-board-text" style={{ color: "red" }}>{errors.name ? (errors.name) : null}</p>
            </label>
            <label className="edit-board-modal-description">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's your board about?"
                className="edit-board-modal-description-input"
              ></textarea>
              <p className="edit-board-text">{225 - description?.length}</p>
              <p className="edit-board-text" style={{ color: "red" }} >{(description && description?.length > 225) ? "Ooops, this description is too long" : null}</p>
            </label>
            <label>
              <p className="edit-board-settings">Settings</p>
              <div className="edit-board-modal-flex-row">
                <input type="checkbox" checked={isPrivate} name="isPrivate" onChange={() => setIsPrivate(!isPrivate)} className="edit-board-checkbox-input" />
                <div>
                  <p className="edit-board-modal-private-text bold">Keep this board secret</p>
                  <p className="edit-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
                </div>
              </div>
            </label>
            <div className="edit-board-delete-text-bottom-container" >
              <p className="edit-board-action">Action</p>
              <h2 className="edit-board-delete-text" onClick={onDelete}>Delete Board
              </h2>
              <p className="edit-board-delete-warning">Delete this board and all its Pins forever.</p>
              <p className="edit-board-delete-warning">You can't undo this!</p>
            </div>
          </div>
          <div className="edit-board-button-wrapper">
            <button className="edit-board-modal-create-button" disabled={disabledButton} >
              Done
            </button>
          </div>

        </form>
      </div>

    </>
  )
}


export default UpdateBoardModal
