import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory, useParams } from 'react-router-dom'
import { createBoardThunk, getBoardsByUsername, updateBoardThunk } from "../../store/boards";
import DeleteBoardModal from "../DeleteBoardModal";
import { deleteBoardThunk } from "../../store/boards";

import './UpdateBoardModal.css'
import OpenModalButton from "../OpenModalButton";


function UpdateBoardModal({ sessionUser }) {


  const dispatch = useDispatch();
  const params = useParams()
  const history = useHistory()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  // get board if from url
  let { id } = params;
  id = parseInt(id)

  const username = sessionUser.username


  useEffect(() => {
  }, [name, isPrivate, description])




  const currentState = useSelector(state => state.boards)


  const currentProfileBoards = useSelector((state) => state.boards.currentProfileBoards)

  // const currentBoard = useSelector((state) => state.boards.currentProfileBoards["User Boards"][id -1])


  // if (currentProfileBoards.values().length > 0) {
  //   const currentBoard = useSelector((state) => state.boards.currentProfileBoards["User Boards"][id])
  // }




  // get current board details
  useEffect(() => {
    dispatch(getBoardsByUsername(username))
  }, [dispatch])


  // if (!currentBoard) {
  //   return <h1>loading</h1>
  // }



  const disabledButton = name === "";

  const handlePrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };




  const onDelete = () => {

    dispatch(deleteBoardThunk(id))
    history.push('/feed')

  }





  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission


    //VALIDATIONS



    //create form data
    const updatedBoardData = {
      name,
      private: isPrivate,
      description: description
    }
    //log formData

    await dispatch(updateBoardThunk(updatedBoardData, 1))




  };



  if (!currentProfileBoards) {
    return <h1>loading</h1>
  }

  return (
    <>
      <div className="edit-board-modal-container">

        <div className="edit-board-modal-header">
          Edit board
        </div>

        <form onSubmit={onSubmit}>

          <div className="edit-board-cover-image-container">
            <div className="edit-board-cover-image-text">Board cover</div>
            <div className="edit-board-cover-image">
              <div className="edit-board-cover-image-plus-sign">+</div>
            </div>

          </div>

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

          <div className="edit-board-delete-text-bottom-container" onClick={onDelete}>
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
