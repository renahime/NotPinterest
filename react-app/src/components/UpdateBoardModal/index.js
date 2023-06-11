import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory, useParams } from 'react-router-dom'
import { createBoardThunk, updateBoardThunk } from "../../store/boards";
import UpdateDeleteBoardModal from "./DeleteBoardModal";
import { deleteBoardThunk } from "../../store/boards";
import SavePinsToBoardModal from "../CreateBoardModal/SavePinsToBoard";
import ChangeBoardCoverModal from "./ChangeBoardCoverModal";
import { deleteBoardProfileThunk, updateProfileBoardThunk } from "../../store/profile";
import { deleteBoardSessionThunk } from "../../store/session";

import './UpdateBoardModal.css'
import OpenModalButton from "../OpenModalButton";


function UpdateBoardModal({ sessionUser, id, username, newCoverImage }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setModalContent, closeModal } = useModal();

  const [refresh, setRefresh] = useState(false)

  //Console.logs to check data is fetching
  // console.log("BOARD ID", id)
  // console.log("BOARD USERNAME", username)
  // console.log("newCoverIMAGE", newCoverImage)
  // const { id } = useParams();
  // const username = sessionUser?.username;
  // console.log("SESSION USERNAME", sessionUser?.username)

  // console.log("ID", id)
  const currentProfileBoards = useSelector((state) => state.profile.currentProfile.boards);
  // console.log("CURRENT PROFILE BOARDS", currentProfileBoards)

  const currentProfileBoardsArr = Object.values(currentProfileBoards)
  // console.log("ARR OF BOARDS", currentProfileBoardsArr)

  let oldBoardData;

  for (let i = 0; i < currentProfileBoardsArr.length; i++) {
    const boardValues = Object.values(currentProfileBoardsArr[i]);
    for (let j = 0; j < boardValues.length; j++) {
      if (boardValues[j] === id) {
        oldBoardData = currentProfileBoardsArr[i];
        break; // Exit the loop once the matching object is found
      }
    }
    if (oldBoardData) {
      break; // Exit the outer loop if the matching object is found
    }
  }
  // console.log("OLD BOARD DATA", oldBoardData)

  // const oldBoardData = currentProfileBoards[id - 1];
  // console.log("OLD BOARD DATA", oldBoardData)

  const pinImages = oldBoardData?.additional_images
  // console.log("PIN IMAGES", pinImages)


  //set form data
  const [name, setName] = useState(oldBoardData?.name || "");
  const [description, setDescription] = useState(oldBoardData?.description || "");
  const [isPrivate, setIsPrivate] = useState(oldBoardData?.private || false);
  const [cover_image, setCoverImage] = useState(
    newCoverImage ? newCoverImage : oldBoardData?.cover_image || ""
  );



  //fetch boards by username
  // useEffect(() => {
  //   dispatch(getBoardsByUsername(username)).then(() => setIsLoaded(true));
  // }, [username]);


  // on render, set the board data in fields
  useEffect(() => {
    setName(oldBoardData?.name || "");
    setDescription(oldBoardData?.description || "")
    setIsPrivate(oldBoardData?.private || false);
    setCoverImage(newCoverImage ? newCoverImage : oldBoardData?.cover_image || "")
  }, [isLoaded])


  // when we click on Board Cover we need to open up modal to save pins to board.
  const openModal = () => {
    const modalContent = (
      <div>
        <ChangeBoardCoverModal pinImages={pinImages} updatedBoardData={updatedBoardData} id={id} username={username} />
      </div>
    );
    setModalContent(modalContent);
  };


  // sets the private variable
  const handlePrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  // validate Done button
  const disabledButton = name === "";



  // when they click the delete section, it will delete the board and send them back to boards page
  const onDelete = () => {
    // dispatch(deleteBoardThunk(id));
    dispatch(deleteBoardSessionThunk(id))
    // dispatch(deleteBoardProfileThunk(id))


    closeModal()
    window.location.reload()

  };


  useEffect(() => {


  }, [refresh])


  // const onDelete = () => {

  //   return (
  //     <DeleteBoardModal />
  //   )

  // };

  //updated data that we will send to the thunk
  const updatedBoardData = {
    name,
    private: isPrivate,
    description: description,
    cover_image: cover_image
  };


  // on Submit we update the new Board data and then we redirect user to their new board page
  const onSubmit = async (e) => {
    e.preventDefault();
    // await dispatch(updateBoardThunk(updatedBoardData, id))

    await dispatch(updateProfileBoardThunk(updatedBoardData, id))

    const boardName = updatedBoardData.name.split(' ').join('_').toLowerCase()
    // const boardName = currentProfileBoards[id]?.name;
    // history.push(`/${username}/${boardName}`);
    closeModal()
  };

  const closeTheModal = () => {
    closeModal()
  }


  if (!currentProfileBoards || !username) {
    return <h1>loading</h1>;
  }
  return (
    <>


      <div className="edit-board-modal-container">
        <div className="edit-board-modal-header">
          Edit board
        </div>

        <form onSubmit={onSubmit}>
          {/* <div className="edit-board-cover-image-plus-sign">+</div> */}
          {cover_image[0] !== undefined && (
            <div className="edit-board-cover-image-container">
              <div className="edit-board-cover-image-text">Board cover</div>
              <div className="edit-board-cover-image" onClick={openModal}>
                <img src={cover_image} className="edit-board-cover-image" />
              </div>
            </div>
          )}

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

          <button className="edit-board-modal-create-button" disabled={disabledButton} >
            Done
          </button>

          <div className="edit-board-delete-text-bottom-container" >
            <p className="edit-board-action">Action</p>
            <h2 className="edit-board-delete-text" onClick={onDelete}>Delete Board
              {/* <OpenModalButton
                  buttonText="Delete Board"
                  className="dropdown-item"
                  modalComponent={<DeleteBoardModal id={id} user={sessionUser} />}
                /> */}
            </h2>
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
