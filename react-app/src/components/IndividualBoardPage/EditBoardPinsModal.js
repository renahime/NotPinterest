import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { unpinThunk, repinThunk } from "../../store/boards";

export default function EditBoardPinsModal({ pin, currentBoard }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const userBoards = useSelector(state => state.boards.currentUserBoards)
    const [boardName, setBoardName] = useState(currentBoard.name);

    const options = []

    for (let boardName of Object.values(userBoards)) {
        options.push({ value: boardName.name, label: boardName.name })
    }

    let handleSaveClick = async () => {
        if (currentBoard.name === boardName) {
            closeModal()
        } else {
            let newboard
            for (let board of Object.values(userBoards)) {
                if (board.name === boardName) {
                    newboard = board
                }
            }
            let res = await dispatch(repinThunk(pin, currentBoard.id, newboard.id)).then(() => closeModal())
        }
    }

    let handleDeleteClick = async () => {
        let deletedPin = await dispatch(unpinThunk(pin, currentBoard.id)).then(() => closeModal())
    }


    return (
        <div className="edit-pin-board-wrapper">
            <h1 className="edit-pin-board-title">Edit this Pin</h1>
            <div className="edit-pin-board-content">
                <div className="move-pin-board-form-wrapper">
                    <h2>Change Board</h2>
                    <form className="move-pin-board-form">
                        <p>Board</p>
                        <select
                            className="board-dropdown-edit-pin"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}>
                            {options.map((option) => (
                                <option
                                    className="board-options"
                                    value={option.value}>{option.label}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
                <div>
                    <img className="edit-pin-board-image" src={pin.image} alt={pin.alt_text ? pin.alt_text : "changed-pin-image"} />
                </div>
            </div>
            <div className="edit-pin-board-buttons-wrapper">
                <div>
                    <button className="edit-pin-board-buttons" onClick={handleDeleteClick}>Delete</button>
                </div>
                <div>
                    <button className="edit-pin-board-buttons"  onClick={() => closeModal()}>Cancel</button>
                    <button className="edit-pin-board-buttons-save"  onClick={handleSaveClick}>Save</button>
                </div>
            </div>
        </div>
    )
}