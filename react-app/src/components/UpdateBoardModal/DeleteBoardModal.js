import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { deleteBoard } from "../../store/boards";


function UpdateDeleteBoardModal({ id, user }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteBoard(id)).then(() => closeModal())
  };

  return (
    <div className="delete-pin-container">
      <h1>Are you sure?</h1>
      <h6>Once you delete a Board, you can't undo it!</h6>
      <div className="buttons">
        <button onClick={() => closeModal()}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
export default UpdateDeleteBoardModal;
