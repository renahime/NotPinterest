import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { createBoardThunk } from "../../store/boards";

import './UpdateBoardModal.css'


function UpdateBoardModal() {


  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {

  }, [name, isPrivate])

  const disabledButton = name === "";

  const handlePrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };


  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission


    //VALIDATIONS



    //create form data
    const formData = {
      name,
      private: isPrivate,
      description: "this is a test"
    }
    //log formData
    console.log("FORM DATA:", formData)

    await dispatch(createBoardThunk(formData))



  };


  return (
    <>
      <div className="edit-board-modal-container">

        <div className="edit-board-modal-header">
          Edit board
        </div>

        <form onSubmit={onSubmit}>

          <label className="edit-board-modal-name">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="edit-board-modal-name-input"

            ></input>
          </label>

          <label className="edit-board-modal-description">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your board about?"
              className="edit-board-modal-description-input"
            ></textarea>
          </label>

          <label>


            <p className="edit-board-settings">Settings</p>

            <div className="edit-board-modal-flex-row">

              <input type="checkbox" checked={isPrivate} onChange={handlePrivateChange} className="edit-board-checkbox-input" />

              <div>
                <p className="edit-board-modal-private-text bold">Keep this board secret</p>
                <p className="edit-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
              </div>

            </div>
          </label>


          <button className="edit-board-modal-create-button" disabled={disabledButton}>
            Done
          </button>

          <div className="edit-board-delete-text-bottom-container">
            <p className="edit-board-action">Action</p>
            <h3 className="edit-board-delete-text">Delete board</h3>
            <p className="edit-board-delete-warning">Delete this board and all its Pins forever.</p>
            <br></br>
            <p className="edit-board-delete-warning">You can't undo this!</p>
          </div>

        </form>
      </div>
    </>
  )

}


export default UpdateBoardModal
