import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
import EditPinModal from "./EditPinModal";
import { deletePinThunk } from "../../store/pins";
// import { removePin } from "../../store/session";

function DeletePinModal({ pin, user, boardState }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  // let boardName = null
  // if (user) {
  //   for (let userBoard of user.boards) {
  //     for (let pinId of userBoard.pins) {
  //       if (pinId == pin.id) {
  //         boardName = userBoard.name.split(' ').join('_').toLowerCase()
  //       }
  //     }
  //   }
  // }
  const handleDelete = async (e) => {
    e.preventDefault();
    const pinId = await dispatch(deletePinThunk(pin.id)).then(closeModal())
    // let removeFromProfile = await dispatch(removePin(pin.id))
    if (pinId) {
      history.push(`/${user.username}`)
    }
  }
  return (
    <div className="delete-pin-container">
      <h1>Are you sure?</h1>
      <h6>Once you delete a Pin, you can't undo it!</h6>
      <div className="buttons">
        <button>
          <OpenModalButton
            buttonText="Cancel"
            className="dropdown-item"
            modalComponent={<EditPinModal pin={pin} />}
          />
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}
export default DeletePinModal;
