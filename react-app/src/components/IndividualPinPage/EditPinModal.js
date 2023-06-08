import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
import DeletePinModal from "./DeletePinModal";
import DeletePinNonOwner from "./DeletePinNonOwner";
import { updatePinThunk } from "../../store/pins";
import { repinThunk } from "../../store/pins";



function EditPinModal({ pin, originalBoardName, grabBoardName }) {
  const user = useSelector(state => state.session.user)
  const options = []
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
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
    const updatedPin = dispatch(updatePinThunk(pinToUpdated)).then(updatedPin => { history.push(`/pins/${updatedPin.id}`) }).catch(async (res) => {
      const data = await res;
      setErrors(data.errors);
    });
    pin = pinToUpdated
  }

  const handleRepin = async (e) => {
    let oldBoardId
    let newBoardId
    for (let userBoard of user.boards) {
      if (boardName == userBoard.name) {
        newBoardId = userBoard.id
      }
      if (originalBoardName == userBoard.name) {
        oldBoardId = userBoard.id
      }
    }
    const pinId = await dispatch(repinThunk(pin.id, oldBoardId, newBoardId))
    console.log(pinId);
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
            <input value={title} type="text" onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div className="pin-description-container">
            <h6 className="pin-description-text">Description</h6>
            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text"></input>
          </div>
          <div className="pin-website-container">
            <h6 className="pin-website-text">Website</h6>
            <input value={destination} onChange={(e) => setDestination(e.target.value)} type="text"></input>
          </div>
          <div className="pin-alt-text-container">
            <h6 className="pin-alt-text-text">Alt text</h6>
            <input value={alt_text} onChange={(e) => setAltText(e.target.value)} type="text"></input>
          </div>
        </div>
        <div className="buttons-container">
          <button>
            <OpenModalButton
              buttonText="Delete"
              className="dropdown-item"
              modalComponent={<DeletePinModal originalBoardName={grabOriginalBoardName} user={user} pin={pin} />}
            />
          </button>
          <button onClick={handleClose}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div >
    :
    <div className="pin-edit-non-owner-container">
      <h1 className="title">Edit Pin</h1>
      <form className="pin-edit-non-owner-form">
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
          <button>
            <OpenModalButton
              buttonText="Delete"
              className="dropdown-item"
              modalComponent={<DeletePinNonOwner pin={pin} user={user} />}
            />
          </button>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleRepin}>Save</button>
        </div>
      </form>
    </div>
  )
}


export default EditPinModal;
