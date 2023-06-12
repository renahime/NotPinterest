import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
import DeletePinModal from "./DeletePinModal";
import DeletePinNonOwner from "./DeletePinNonOwner";
import { updatePinThunk } from "../../store/pins";
import { repinThunk } from "../../store/boards";
import "./EditPinModal.css"


function EditPinModal({ pin, boardState, originalBoardName, grabBoardName }) {
  const user = useSelector(state => state.session.user)
  const options = []
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const singlePinWithBoardState = boardState;
  const grabOriginalBoardName = originalBoardName
  const [boardName, setBoardName] = useState(grabBoardName?.name);
  const [title, setTitle] = useState(pin?.title);
  const [description, setDescription] = useState(pin?.description);
  const [destination, setDestination] = useState(pin?.destination);
  const [alt_text, setAltText] = useState(pin?.alt_text);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  if (user) {
    for (let boardName of user.boards) {
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
    const sendRepin = await dispatch(repinThunk(pin, oldBoardId, newBoardId)).then(closeModal())
    if (sendRepin) {
      return history.push(`/${user.username}/${sendBoardName}`)
    }
  }


  return (loading ? <h1>loading...</h1> : user.id === pin.owner_id ?
    <div className="pin-edit-owner-container">
      <h1 className="title">Edit This Pin</h1>
      <form onSubmit={handleSubmit} className="pin-edit-owner-form">
        <div className="board-edit-owner-input">
          <div className="board-title-container">
            <h6 className="board-title-text">Board</h6>
            <select className="board-dropdown" value={boardName} onChange={(e) => setBoardName(e.target.value)}>
              {options.map((option) => (
                <option className="board-options" value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.boardName ? <p className="edit-pin-errors" style={{ color: 'red' }}>{errors.boardName}</p> : null}
          </div>
          <div className="pin-title-container">
            <h6 className="pin-title-text">Title</h6>
            <div>
              <input className="pin-edit-title-input" value={title} onChange={(e) => setTitle(e.target.value)} type="text"></input>
              {errors.destination || (title && title.length > 100) ?
                <div className="edit-pin-active-caption">
                  <p className="create-pin-errors ">
                    {errors.title ? errors.title : " Ooops! This title is getting long. Try trimming it down."
                    }
                  </p>
                  <p className="create-pin-errors">{title ? 100 : title.length < 100 ? 100 - title.length : null}</p>
                </div>
                :
                <div className={`edit-pin-active-caption`}>
                  <p>{!title ? 100 : 100 - title.length}</p>
                </div>
              }
              {errors.title ? <p className="create-pin-errors">{errors.title}</p> : null}
            </div>
          </div>
          <div className="pin-description-container">
            <h6 className="pin-description-text">Description</h6>
            <div className="edit-pin-description-with-errors">
              <input className="pin-edit-description-input" value={description} onChange={(e) => setDescription(e.target.value)} type="text"></input>
              {errors.destination || (description && description.length > 225) ?
                <div className="edit-pin-active-caption">
                  <p className="create-pin-errors ">
                    {errors.description ? errors.description : " Ooops! This description is getting long. Try trimming it down."
                    }
                  </p>
                  <p className="create-pin-errors">{description ? 225 : description.length < 225 ? 225 - description.length : null}</p>
                </div>
                :
                <div className={`edit-pin-active-caption`}>
                  <p>{!description ? 225 : 225 - description.length}</p>
                </div>
              }
              {errors.description ? <p className="create-pin-errors">{errors.description}</p> : null}
            </div>
          </div>
          <div className="pin-website-container">
            <h6 className="pin-website-text">Website</h6>
            <div className="edit-pin-website-with-errors">
              <input className="pin-edit-website-input" value={destination} onChange={(e) => setDestination(e.target.value)} type="text"></input>
              {errors.destination || (destination && destination.length > 225) ?
                <div className="edit-pin-active-caption">
                  <p className="create-pin-errors ">
                    {errors.destination ? errors.destination : " Ooops! This site is getting long. Try trimming it down."
                    }
                  </p>
                  <p className="create-pin-errors">{destination ? 225 : destination.length < 225 ? 225 - destination.length : null}</p>
                </div>
                :
                <div className={`edit-pin-active-caption`}>
                  <p>{!destination ? 225 : 225 - destination.length}</p>
                </div>
              }
              {errors.destinationLink ? <p className="create-pin-errors">{errors.destinationLink}</p> : null}
            </div>
          </div>
          <div className="pin-alt-text-container">
            <h6 className="pin-alt-text-text">Alt text</h6>
            <div className="edit-pin-alt-text-with-errors">
              <input className="pin-edit-alt-text-input" value={alt_text} onChange={(e) => setAltText(e.target.value)} type="text"></input>
              {errors.alt_text || (alt_text && alt_text.length > 225) ?
                <div className="edit-pin-active-caption">
                  <p className="create-pin-errors ">
                    {errors.alt_text ? errors.alt_text : " Ooops! This alternate text is getting long. Try trimming it down."
                    }
                  </p>
                  <p className="create-pin-errors">{alt_text.length ? 225 : 225 - alt_text.length}</p>
                </div>
                :
                <div className={`edit-pin-active-caption`}>
                  <p>{!alt_text ? 225 : 225 - alt_text.length}</p>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button className="edt-pin-delete-button">
            <OpenModalButton
              buttonText="Delete"
              className="dropdown-item"
              modalComponent={<DeletePinModal boardState={singlePinWithBoardState} originalBoardName={grabOriginalBoardName} user={user} pin={pin} />}
            />
          </button>
          <div className="submit-and-cancel-buttons">
            <button className="edit-pin-submit-button" type="submit">Save</button>
            <button className="edit-pin-cancel-button" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </form>
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
