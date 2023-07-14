import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createBoardThunk } from "../../store/boards";
import './CreateBoardModal.css'
function CreateBoardFromProfile({ username, current }) {

  const dispatch = useDispatch();
  const history = useHistory()
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState(false);
  const [description, setDescription] = useState("")
  const { setModalContent, closeModal } = useModal();
  const user = useSelector(state => state.session.user)

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
    for (let board of current.boards) {
      if (board) {
        if (name == board.name) {
          return setErrors({ 'errors': 'You already have a board with this name' })
        }
      }
    }
    const formData = {
      name,
      private: isPrivate,
      description: description
    }
    let newBoardProfile = await dispatch(createBoardThunk(formData))
    if (newBoardProfile) {
      closeModal()
    }
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
            <p>   {errors ? <p style={{ color: 'red' }}>{errors.errors}</p> : null}</p>
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
          <button type="submit" className="create-board-modal-create-button" disabled={disabledButton}>
            Create
          </button>

        </form>
      </div>
    </>
  )

}


export default CreateBoardFromProfile
