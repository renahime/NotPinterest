import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useModal } from '../../../context/Modal'
import Dropdown from './Dropdown'
import { deleteProfileThunk } from '../../../store/profile'
import "./DeleteUserModal.css"

function DeleteUserModal({ user }) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

  const handleClick = async (e) => {
    e.preventDefault()
    const deleteProfile = await dispatch(deleteProfileThunk(user))
    if (deleteProfile.errors) {
      setErrors(deleteProfile)
    } else {
      closeModal()
      return history.push(`/`)

    }
  }
  const { closeModal } = useModal();
  const handleClose = (e) => {
    closeModal()
  };

  return (
    <div className='delete-profile-modal' style={{ textAlign: 'center', margin: 'auto' }}>
      {errors ? <p>{errors.errors}</p> : null}
      <h1>Are you sure?</h1>
      <h4>If you delete your account you won't be able to share threads and create seams catered to your style!</h4>
      <div className='delete-user-modal-buttons'>
        <button type='button' id="confirm-delete-button" onClick={handleClick}>Confirm Delete</button>
        <button type='button' id="reject-delete-button" onClick={() => closeModal()}>Stay a While</button>
      </div>
    </div>
  )
}
export default DeleteUserModal;
