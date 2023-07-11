import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
import DeletePinModal from "./DeletePinModal";
import DeletePinNonOwner from "./DeletePinNonOwner";
import { updatePinThunk } from "../../store/pins";
// import { repinThunk } from "../../store/boards";
import "./EditPinModal.css"


function EditPinModal({ pin, boardState, originalBoardName, grabBoardName }) {
  const user = useSelector(state => state.session.user)
  const options = []
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const singlePinWithBoardState = boardState;
  const grabOriginalBoardName = originalBoardName
  const [boardName, setBoardName] = useState(grabBoardName?.name);
  const [title, setTitle] = useState(pin.title ? pin.title : "");
  const [description, setDescription] = useState(pin.description ? pin.description : "");
  const [destination, setDestination] = useState(pin.destination ? pin.destination : "");
  const [alt_text, setAltText] = useState(pin.alt_text ? pin.alt_text : "");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const currentUserBoards = useSelector(state => state.boards.currentUserBoards)

  if (user) {
    for (let boardName of Object.values(currentUserBoards)) {
      options.push({ value: boardName.name, label: boardName.name })
    }
  }
  const handleClose = (e) => {
    setErrors({})
    setBoardName(grabBoardName?.name)
    setDescription(pin?.title)
    setDestination(pin?.description)
    setAltText(pin?.destination)
    setErrors(pin?.alt_text)
    closeModal()
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {}
    if (destination) {
      let siteCheck = destination.slice(-4)
    }
    let sites = ['.com', '.jpeg', '.jpg', '.png']
    if (title) {
      if (title.length > 100) {
        validationErrors.title = "Ooops! This title is getting long. Try trimming it down."
      }
    }
    if (description) {
      if (description.length > 225) {
        validationErrors.description = "Ooops! This description is getting long. Try trimming it down."
      }
    }
    if (alt_text) {
      if (alt_text.length > 225) {
        validationErrors.altText = "Ooops! This alt text is getting long. Try trimming it down."
      }
    }
    if (destination) {
      if (sites.includes.siteCheck) {
        validationErrors.destinationLink = "Ooops! This isn't a valid link."
      }
    }

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    const pinToUpdated = { ...pin, boardName, title, description, destination, alt_text };
    const updatedPin = await dispatch(updatePinThunk(pinToUpdated)).then(setLoading(true))
    if (updatedPin.errors) {
      setErrors(updatedPin.errors)
      return
    } else {
      closeModal()
      setLoading(false);
    }
  }

  const handleRepin = async (e) => {
    let oldBoardId
    let newBoardId
    let sendBoardName
    let validationErrors = {}

    for (let userBoard of user.boards) {
      if (boardName == userBoard.name) {
        newBoardId = userBoard.id
        sendBoardName = userBoard.name.split(' ').join('_').toLowerCase()
      }
      if (originalBoardName == userBoard.name) {
        oldBoardId = userBoard.id
      }
    }
    if (!sendBoardName) {
      validationErrors.boardName = "Ooop! You haven't chosen a board to re pin this to yet"
    }
    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    // const sendRepin = await dispatch(repinThunk(pin, oldBoardId, newBoardId)).then(closeModal())
    // if (sendRepin) {
    //   return history.push(`/${user.username}/${sendBoardName}`)
    // }
  }

  return (loading ? <h1>loading...</h1> : user.id === pin.user.id ?
    <div className="pin-edit-owner-container">
      <div className="pin-edit-owner-inner-container">
      <h1 className="title">Edit This Pin</h1>
      <form onSubmit={handleSubmit} className="pin-edit-owner-form">
        <div className="board-edit-owner-input">
          <div className="board-title-container">
            <h6 className="board-title-text">Board</h6>
            <select className="board-dropdown" value={boardName} onChange={(e) => setBoardName(e.target.value)}>
              {options.map((option) => (
                <option className="board-options" value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.boardName ? <p className="edit-pin-errors" style={{ color: 'red' }}>{errors.boardName}</p> : null}
          </div>
          <div className="pin-title-container">
            <h6 className="pin-title-text">Title</h6>
            <div>
              <label>
                <input
                  className="pin-edit-title-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
                <p className={title.length > 100 ? "create-pin-errors edit-board-errors" : "edit-board-character-count"}>{title.length + "/" + 100}</p>
                {errors.title ? <p className="create-pin-errors edit-board-errors">{errors.title}</p> : null}
              </label>
            </div>
          </div>
          <div className="pin-description-container">
            <h6 className="pin-description-text">Description</h6>
            <div className="edit-pin-description-with-errors">
              <textarea
                className="pin-edit-description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
              />
              <p className={description.length > 255 ? "create-pin-errors edit-board-errors" : "edit-board-character-count"}>{description.length + "/" + 255}</p>
              {errors.description ? <p className="create-pin-errors edit-board-errors">{errors.description}</p> : null}
            </div>
          </div>
          <div className="pin-website-container">
            <h6 className="pin-website-text">Website</h6>
            <div className="edit-pin-website-with-errors">
              <input
                className="pin-edit-website-input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="url"
              />
              <p className={destination.length > 255 ? "create-pin-errors edit-board-errors" : "edit-board-character-count"}>{destination.length + "/" +255}</p>
              {errors.destinationLink ? <p className="create-pin-errors">{errors.destinationLink}</p> : null}
            </div>
          </div>
          <div className="pin-alt-text-container">
            <h6 className="pin-alt-text-text">Alt text</h6>
            <div className="edit-pin-alt-text-with-errors">
              <input className="pin-edit-alt-text-input" value={alt_text} onChange={(e) => setAltText(e.target.value)} type="text"></input>
              <p className={alt_text.length > 255 ? "create-pin-errors edit-board-errors" : "edit-board-character-count"}>{alt_text.length + "/" + 255}</p>
              {errors.alt_text ? <p className="create-pin-errors">{errors.alt_text}</p> : null}
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button
          onClick={() => setModalContent(<DeletePinModal boardState={singlePinWithBoardState} originalBoardName={grabOriginalBoardName} user={user} pin={pin} />)}
          className="edt-pin-delete-button">
            Delete
          </button>
          <div className="submit-and-cancel-buttons">
            <button className="edit-pin-submit-button" type="submit">Save</button>
            <button className="edit-pin-cancel-button" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </form>
      </div>
    </div >
    :
    <div className="pin-edit-non-owner-container">
      <h1 className="title">Edit Pin</h1>
      <form onSubmit={handleRepin} className="pin-edit-non-owner-form">
        <div className="board-edit-owner-input">
          <div className="board-title-container">
            <h6 className="board-title-text">Board</h6>
            <select className="board-dropdown" value={boardName} onChange={(e) => setBoardName(e.target.value)}>
              {options.map((option) => (
                <option className="board-options" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttons-container">
          <button className="edt-pin-delete-button-non-owner">
            <OpenModalButton
              buttonText="Delete"
              className="dropdown-item"
              modalComponent={<DeletePinNonOwner pin={pin} user={user} />}
            />
          </button>
          <button className="edit-pin-submit-button-non-owner" onClick={handleClose}>Cancel</button>
          <button className="edit-pin-cancel-button-non-owner" type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}


export default EditPinModal;
