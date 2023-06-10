import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
// import EditPinModal from "./EditPinModal";
import { deletePinThunk } from "../../store/pins";
import { deleteBoardThunk } from "../../store/boards";


function UpdateDeleteBoardModal({ id, user }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  let boardName = null
  // if (user) {
  //   for (let userBoard of user.boards) {
  //     for (let pinId of userBoard.pins) {
  //       if (pinId == pin.id) {
  //         boardName = userBoard.name.split(' ').join('_').toLowerCase()
  //       }
  //     }
  //   }
  // }

  const onDelete = () => {
    dispatch(deleteBoardThunk(id));
    closeModal()
  };


  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   const boardId = await dispatch(deleteBoardThunk(id)).then(closeModal)
  //   if (boardId) {
  //     return history.push(`/${user.username}`)
  //   }
  // }

  return (
    <div className="delete-pin-container">
      <h1>Are you sure?</h1>
      <h6>Once you delete a Pin, you can't undo it!</h6>
      <div className="buttons">
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
export default UpdateDeleteBoardModal;
