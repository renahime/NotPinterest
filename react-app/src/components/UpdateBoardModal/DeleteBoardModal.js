import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { deleteBoard } from "../../store/boards";
import "./UpdateDeleteBoardModal.css"

function UpdateDeleteBoardModal({ id, user }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteBoard(id)).then(() => closeModal())
  };

  return (
    <div className="delete-board-container">
      <h1 className="delete-board-page-header">Are you sure?</h1>
      <h2 className="delete-board-page-caption">Once you delete a Board, you can't undo it!</h2>
      <div className="delete-board-page-buttons">
        <button className="delete-board-page-cancel-button" onClick={() => closeModal()}>Cancel</button>
        <button className="delete-board-page-delete-button" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
export default UpdateDeleteBoardModal;
