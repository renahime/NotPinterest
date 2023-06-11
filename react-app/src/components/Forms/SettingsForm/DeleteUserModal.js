import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useModal } from '../../../context/Modal'
import Dropdown from './Dropdown'
import { deleteProfileThunk } from '../../../store/profile'
function DeleteUserModal({ user }) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const handleClick = async (e) => {
    e.stopPropagation()
    const deleteProfile = await dispatch(deleteProfileThunk(user))
    if (deleteProfile.errors) {
      setErrors(deleteProfile)
    } else {
      console.log("deleted")
      closeModal()
      return history.push(`/`)
      
    }
  }
  const { closeModal } = useModal();
  const handleClose = (e) => {
    closeModal()
  };

  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      {errors ? <p>{errors.errors}</p> : null}
      <h1>Are you sure?</h1>
      <h4>If you delete your account you won't be able to share pins and create boards catered to your style and we can't sell your data!!!</h4>
      <button onClick={handleClick}>Yes</button>
      <button onClick={handleClose}>No</button>
    </div>
  )
}
export default DeleteUserModal;
