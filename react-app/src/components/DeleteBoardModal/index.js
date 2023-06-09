import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { createBoardThunk } from "../../store/boards";

// import './CreateBoardModal.css'


function DeleteBoardModal() {

  const dispatch = useDispatch();
  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {

  }, [])




  return (
    <>
      <div className="create-board-modal-container">

        <div className="create-board-modal-header">
          Are you sure?
        </div>

        <div className="create-board-modal-header">
          Once you delete a board and all its Pins, you can't undo it!
        </div>

          <button className="create-board-modal-create-button" >
            Delete
          </button>

      </div>
    </>
  )

}


export default DeleteBoardModal
