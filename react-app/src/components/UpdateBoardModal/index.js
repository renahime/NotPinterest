// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import { useHistory, useParams } from 'react-router-dom'
// import { createBoardThunk, updateBoardThunk } from "../../store/boards";
// import UpdateDeleteBoardModal from "./DeleteBoardModal";
// import { deleteBoardThunk } from "../../store/boards";
// import SavePinsToBoardModal from "../CreateBoardModal/SavePinsToBoard";
// import ChangeBoardCoverModal from "./ChangeBoardCoverModal";
// import { deleteBoardProfileThunk, updateProfileBoardThunk } from "../../store/profile";
// import { deleteBoardSessionThunk } from "../../store/session";

// import './UpdateBoardModal.css'
// import OpenModalButton from "../OpenModalButton";


// function UpdateBoardModal({ id, newCoverImage, board }) {

//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const { setModalContent, closeModal } = useModal();

//   const user = useSelector((state) => state.sessionUser);
//   //set form data
//   const [name, setName] = useState(board?.name);
//   const [description, setDescription] = useState(board?.description);
//   const [isPrivate, setIsPrivate] = useState(board?.private);
//   const [cover_image, setCoverImage] = useState(
//     newCoverImage ? newCoverImage : board?.cover_image
//   );

//   // when we click on Board Cover we need to open up modal to save pins to board.
//   const openModal = () => {
//     const modalContent = (
//       <div>
//         <ChangeBoardCoverModal pinImages={pinImages} updatedBoardData={updatedBoardData} id={id} username={user.username} />
//       </div>
//     );
//     setModalContent(modalContent);
//   };



//   const handlePrivateChange = (e) => {
//     setIsPrivate(e.target.checked);
//   };

//   const disabledButton = name === "";
//   const onDelete = () => {
//     dispatch(deleteBoardSessionThunk(id))
//     closeModal()
//     window.location.reload()
//   };

//   //updated data that we will send to the thunk
//   const updatedBoardData = {
//     name,
//     private: isPrivate,
//     description: description,
//     cover_image: cover_image
//   };


//   // on Submit we update the new Board data and then we redirect user to their new board page
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // await dispatch(updateBoardThunk(updatedBoardData, id))
//     if (name) {
//       if (title.length > 50) {
//         validationErrors.title = "Ooops! This title is getting long. Try trimming it down."
//       }
//     }
//     if (description) {
//       if (description.length > 225) {
//         validationErrors.description = "Ooops! This description is getting long. Try trimming it down."
//       }
//     }

//     await dispatch(updateProfileBoardThunk(updatedBoardData, id))
//     const boardName = updatedBoardData.name.split(' ').join('_').toLowerCase()
//     closeModal()
//   };

//   const closeTheModal = () => {
//     closeModal()
//   }


//   return (
//     <>
//       <div className="edit-board-modal-container">
//         <div className="edit-board-modal-header">
//           Edit board
//         </div>
//         <form onSubmit={onSubmit}>
//           {/* <div className="edit-board-cover-image-plus-sign">+</div> */}
//           {cover_image[0] !== undefined && (
//             <div className="edit-board-cover-image-container">
//               <div className="edit-board-cover-image-text">Board cover</div>
//               <div className="edit-board-cover-image" onClick={openModal}>
//                 <img src={cover_image} className="edit-board-cover-image" />
//               </div>
//             </div>
//           )}
//           <label className="edit-board-modal-name">
//             Name
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="edit-board-modal-name-input"
//             ></input>
//           </label>
//           <label className="edit-board-modal-description">
//             Description
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="What's your board about?"
//               className="edit-board-modal-description-input"
//             ></textarea>
//           </label>
//           <label>
//             <p className="edit-board-settings">Settings</p>
//             <div className="edit-board-modal-flex-row">
//               <input type="checkbox" checked={isPrivate} onChange={handlePrivateChange} className="edit-board-checkbox-input" />
//               <div>
//                 <p className="edit-board-modal-private-text bold">Keep this board secret</p>
//                 <p className="edit-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
//               </div>
//             </div>
//           </label>
//           <button className="edit-board-modal-create-button" disabled={disabledButton} >
//             Done
//           </button>
//           <div className="edit-board-delete-text-bottom-container" >
//             <p className="edit-board-action">Action</p>
//             <h2 className="edit-board-delete-text" onClick={onDelete}>Delete Board
//               {/* <OpenModalButton
//                   buttonText="Delete Board"
//                   className="dropdown-item"
//                   modalComponent={<DeleteBoardModal id={id} user={sessionUser} />}
//                 /> */}
//             </h2>
//             <p className="edit-board-delete-warning">Delete this board and all its Pins forever.</p>
//             <br></br>
//             <p className="edit-board-delete-warning">You can't undo this!</p>
//           </div>

//         </form>
//       </div>

//     </>
//   )
// }


// export default UpdateBoardModal
