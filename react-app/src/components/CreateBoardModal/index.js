import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { createBoardThunk } from "../../store/boards";

import './CreateBoardModal.css'


function CreateBoardModal() {

  const dispatch = useDispatch();
  const history = useHistory()
  const [name, setName] = useState("");
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

    closeModal()

    history.push('/boards/1')





  };


  return (
    <>
      <div className="create-board-modal-container">

        <div className="create-board-modal-header">
          Create board
        </div>

        <form onSubmit={onSubmit}>

          <label className="create-board-modal-name">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="create-board-modal-name-input"

            ></input>
          </label>

          <label>
            <div className="create-board-modal-flex-row">

              <input type="checkbox" checked={isPrivate} onChange={handlePrivateChange} className="checkbox-input" />

              <div>
                <p className="create-board-modal-private-text bold">Keep this board secret</p>
                <p className="create-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
              </div>

            </div>
          </label>

          <button className="create-board-modal-create-button" disabled={disabledButton}>
            Create
          </button>

        </form>





      </div>
    </>
  )

}


export default CreateBoardModal
