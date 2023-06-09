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
  if (user) {
    for (let boardName of user.boards) {
      options.push({ value: boardName.name, label: boardName.name })
    }
  }
  const handleClose = (e) => {
    closeModal()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const pinToUpdated = { ...pin, boardName, title, description, destination, alt_text };
    const updatedPin = dispatch(updatePinThunk(pinToUpdated)).then(updatedPin => { history.push(`/pin/${updatedPin.id}`) }).then(closeModal()).then(refreshPage()).catch(async (res) => {
      const data = await res;
      setErrors(data.errors);
    });
    pin = updatedPin
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const handleRepin = async (e) => {
    let oldBoardId
    let newBoardId
    let sendBoardName
    for (let userBoard of user.boards) {
      if (boardName == userBoard.name) {
        newBoardId = userBoard.id
        sendBoardName = userBoard.name.split(' ').join('_').toLowerCase()
      }
      if (originalBoardName == userBoard.name) {
        oldBoardId = userBoard.id
      }
    }
    const sendRepin = await dispatch(repinThunk(pin, oldBoardId, newBoardId)).then(closeModal())
    if (sendRepin) {
      return history.push(`/${user.username}/${sendBoardName}`)
    }
  }



  return (user.id === pin.owner_id ?
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
          </div>
          <div className="pin-title-container">
            <h6 className="pin-title-text">Title</h6>
            <input value={title} className="pin-edit-title-input" type="text" onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div className="pin-description-container">
            <h6 className="pin-description-text">Description</h6>
            <input className="pin-edit-description-input" value={description} onChange={(e) => setDescription(e.target.value)} type="text"></input>
          </div>
          <div className="pin-website-container">
            <h6 className="pin-website-text">Website</h6>
            <input className="pin-edit-website-input" value={destination} onChange={(e) => setDestination(e.target.value)} type="text"></input>
          </div>
          <div className="pin-alt-text-container">
            <h6 className="pin-alt-text-text">Alt text</h6>
            <input className="pin-edit-alt-text-input" value={alt_text} onChange={(e) => setAltText(e.target.value)} type="text"></input>
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
