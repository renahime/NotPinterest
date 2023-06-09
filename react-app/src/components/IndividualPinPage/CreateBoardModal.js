import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton';
import EditPinModal from "./EditPinModal";
import "./CreateBoardFromPin.css"

function CreateBoardFromPinModal({ pin, user }) {
  const { closeModal } = useModal();
  const handleClose = (e) => {
    closeModal()
  };
  return (
    <div className="create-board-from-pin-container">
      <div className="create-board-from-pin-title">
        <h1>Create Board</h1>
      </div>
      <div className="create-board-from-pin-image-form">
        <img className="create-board-from-pin-image" src={pin.image}></img>
        <div className="create-board-from-pin-form-container">
          <form className="create-board-from-pin-form">
            <div className="create-board-from-pin-form-name">
              <h6>Name</h6>
              <input type="text" name="name" />
            </div>
            <div className="create-board-from-pin-form-secret">
              <label class="switch">
                <h6>Secret</h6>
                <input type="text" name="name" />
                <span class="slider round"></span>
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="create-board-from-pin-image-buttons">
        <button >
          Create
        </button>
        <button onClick={handleClose}>Cancel
        </button>
      </div>
    </div>
  )
}
export default CreateBoardFromPinModal;
