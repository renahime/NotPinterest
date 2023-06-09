import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
import DeletePinModal from "./DeletePinModal";
import EditPinModal from "./EditPinModal";
import { unpinThunk } from "../../store/boards";

function DeletePinNonOwner({ pin, user }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const singlePinWithBoardState = useSelector(state => state)
  let boardName = null
  let boardId = null
  if (user) {
    for (let userBoard of user.boards) {
      for (let pinId of userBoard.pins) {
        if (pinId == pin.id) {
          boardName = userBoard.name.split(' ').join('_').toLowerCase()
          boardId = userBoard.id
        }
      }
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const unpinAction = await dispatch(unpinThunk(pin, boardId)).then(closeModal())
    if (unpinAction) {
      return history.push(`/${user.username}/${boardName}`)
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

export default DeletePinNonOwner;
