import React from 'react'
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { editProfileThunk } from '../../../store/profile'
import Dropdown from './Dropdown'
import { useModal } from '../../../context/Modal'
import OpenModalButton from '../../OpenModalButton'
import './Settings.css'
import DeleteUserModal from './DeleteUserModal'
function Settings() {
  let user = useSelector(state => state.session.user)
  const history = useHistory();
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);
  const [firstName, setFirstName] = useState(user?.first_name)
  const [lastName, setLastName] = useState(user?.last_name)
  const [about, setAbout] = useState(user?.about)
  const [pronouns, setPronouns] = useState(user?.pronouns)
  const [website, setWebsite] = useState(user?.website)
  const [username, setUsername] = useState(user?.username)
  const [errors, setErrors] = useState()

  const options = [
    { value: "ey/em", label: "ey/em" },
    { value: "he/him", label: "he/him" },
    { value: "ne/nem", label: "ne/nem" },
    { value: "she/her", label: "she/her" },
    { value: "ve/ver", label: "ve/ver" },
    { value: "xe/xem", label: "xe/xem" },
    { value: "they/them", label: "they/them" },
    { value: "ze/zir", label: "ze/zir" }
  ]


  const optionsArr = ["Personal information", "Account management", "Tune your home feed",
    "Claimed accounts", "Social permissions", "Notifications", "Notifications", "Privacy and data", "Security and logins", "Branded Content"]
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const sendEditUser = { ...user, firstName, lastName, about, pronouns, website, username }
    const editedUser = dispatch(editProfileThunk(sendEditUser)).catch(async (res) => {
      const data = await res;
      setErrors(data.errors);
    });
    if (editedUser) {
      history.push(`/feed`)
    }
  }



  return (
    <div className='settings-with-footer'>
      <div className='main-settings-div'>
        <div className='settings-list'>
          <h4 className='only-one-that-works'>Public Profile</h4>
          {optionsArr.map((option) => {
            return (<h4 className='settings-text'>{option}</h4>)
          })}</div>
        <div className='pubic-profile-settings-main'>
          <h1>Public profile</h1>
          <h5>People visiting your profile will see the following info</h5>
          <form className='settings-form' onSubmit={handleSubmit}>
            <div className='profile-picture-setting'>
              <h6>Photo</h6>
              <div className='photo-and-button'>
                <img id='profile-picture-display' src={user.profile_image ? user.profile_image : "https://64.media.tumblr.com/441fc6012f18fbf1817e1f7511465ab8/tumblr_p8y5hkOypW1v30v1fo2_400.png" }>
                </img>
                <button id='file-input-actual-button' onClick={handleClick}>Change</button>
                <input className='file-input-button' type="file" ref={hiddenFileInput} style={{ display: 'none' }} />
              </div>
              <div className='name-info'>
                <div className='first-name-info'>
                  <h6>First name</h6>
                  <input className='first-name-input' value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='last-name-info'>
                  <h6>Last name</h6>
                  <input className='first-name-input' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className='about-info'>
                <h6>About</h6>
                <textarea name="About" className='input-about' type="text" value={about} placeholder="Tell your story" onChange={(e) => setAbout(e.target.value)}>
                </textarea>
              </div>
              <div className='pronoun-info'>
                <h6>Pronouns</h6>
                <div className='pronoun-select-list'>
                  <Dropdown isSearchable={true} value={pronouns} placeHolder="Add Your Pronouns" options={options} onChange={(e) => setPronouns(e.target.value)} />
                </div>
                <div className='pronoun-description'>
                  <h6>Choose a sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time.</h6>
                </div>
              </div>
              <div className='website-info'>
                <h6>Website</h6>
                <input type="text" className='website-input' value={website} placeholder='Add a link to drive traffic to your site' onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <div className='username-info'>
                <h6>Username</h6>
                <input type="text" className='username-input' value={username} placeholder='Choose wisely so others can find you' onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className='footer-div'>
              <button className='reset-button'>
                <OpenModalButton
                  buttonText="Delete Account"
                  className="dropdown-item"
                  modalComponent={<DeleteUserModal user={user} />}
                />
              </button>
              <button type="submit" className='save-button'>Save</button>
              <NavLink exact to={`/${user.username}`}>
                <button type='button' className='delete-button'>Cancel</button>
              </NavLink>
            </div>
          </form>
        </div >
      </div>
    </div>
  )
}



export default Settings;
