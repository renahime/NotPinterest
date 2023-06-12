import { useDispatch } from "react-redux";
import { createBoardFromPinPage } from "../../store/session";
import { useState } from "react";
import { useModal } from "../../context/Modal";


export default function CreateNewBoardOnPin({ setter }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState("")
    const { closeModal } = useModal();


    const disabledButton = name === "";

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = {
            name,
            private: isPrivate,
            description: description
        }

        let res = await dispatch(createBoardFromPinPage(formData)).then(closeModal())
        if (res.errors) {
            setErrors(res)
        } else {
            console.log("res", res)
            let res = await dispatch()
            closeModal()
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                {errors ? <p>{errors.errors}</p> : null}
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
                        <input type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} className="checkbox-input" />

                        <div>
                            <p className="create-board-modal-private-text bold">Keep this board secret</p>
                            <p className="create-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
                        </div>
                    </div>
                </label>

                {/* <button type="submit" className="create-board-modal-create-button" disabled={disabledButton} onClick={openModal}> */}
                <button type="submit" className="create-board-modal-create-button" disabled={disabledButton}>
                    Create
                </button>

            </form>
        </div>
    )
}
