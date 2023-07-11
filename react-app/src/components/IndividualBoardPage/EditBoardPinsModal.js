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

    let handleSaveClick = async() => {
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

    let handleDeleteClick = async() => {
        let deletedPin = await dispatch(unpinThunk(pin, currentBoard.id)).then(() => closeModal())
    }


    return (
        <div>
            <h1>Edit this Pin</h1>
            <div>
                <h2>Change Board</h2>
                <form>
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
                <button onClick={handleDeleteClick}>Delete</button>
                <button onClick={() => closeModal()}>Cancel</button>
                <button onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
}