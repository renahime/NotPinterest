import React from 'react'
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { editProfileThunk } from '../../../store/session'
import Dropdown from './Dropdown'
import { useModal } from '../../../context/Modal'
import OpenModalButton from '../../OpenModalButton'
import './Settings.css'
import DeleteUserModal from './DeleteUserModal'
import { useLocation } from "react-router-dom";

function Settings() {
  let user = useSelector(state => state.session.user)
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);
  const {setModalContent} = useModal()
  // const data = location.state.currentUser;
  const [firstName, setFirstName] = useState(user?.first_name || "")
  const [lastName, setLastName] = useState(user?.last_name || "")
  const [about, setAbout] = useState(user?.about || "")
  const [pronouns, setPronouns] = useState(user?.pronouns || "")
  const [website, setWebsite] = useState(user?.website || "")
  const [username, setUsername] = useState(user?.username || "")
  const [errors, setErrors] = useState({})
  const [profilePic, setProfilePic] = useState(user?.profile_image || "");
  const [previewPic, setPreviewPic] = useState(user?.profile_image || "");

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


  const optionsArr = ["Personal information", "Account management", "Tune your home feed",]

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hrllo")
    setErrors({});
    let validationErrors = {}
    if (firstName.length > 255) {
      validationErrors.firstName = "Name must be less than 255 chars"
    }
    if (lastName.length > 255) {
      validationErrors.lastName = "Name must be less than 255 chars"
    }
    if (about.length > 255) {
      validationErrors.about = "Please enter no more than 255 characters."
    }
    if (website.length > 255) {
      validationErrors.website = "Please enter no more than 255 characters."
    }
    if (username.length > 40) {
      validationErrors.username = "Username must be less than 40 characters."
    }
    console.log('about', validationErrors.about)
    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    const profileData = new FormData()
    if (typeof profilePic === "object") profileData.append("profile_picture", profilePic)
    profileData.append("first_name", firstName)
    profileData.append("last_name", lastName)
    if (about) profileData.append("about", about)
    if (pronouns) profileData.append("pronouns", pronouns.value || pronouns)
    if (website) profileData.append("website", website)
    profileData.append("username", username)

    const editedUser = await dispatch(editProfileThunk(user, profileData)).catch(async (res) => {
      const data = await res;
      console.log("data", data)
      setErrors(data);
    });
    if (editedUser) {
      console.log("EDIT", editedUser)
      history.push(`/${editedUser.username}`)
    }
  }

  useEffect(() => {
    if (typeof profilePic === "object") {
        let prev = URL.createObjectURL(profilePic)
        setPreviewPic(prev)
        return () => {
            URL.revokeObjectURL(prev)
        }
    }
  }, [profilePic])

  // useEffect(() => {
  //   console.log("pronouns in use effect", pronouns)
  // }, [pronouns])

  
  return (
    <div className='settings-with-footer'>
      <div className='main-settings-div'>
        <div className='settings-list'>
          <h4 className='only-one-that-works'>Public Profile</h4>
          {optionsArr.map((option) => {
            return (<h4 className='settings-text' onClick={() => alert("Feature coming soon!")}>{option}</h4>)
          })}</div>
        <div className='pubic-profile-settings-main'>
          <h1>Public profile</h1>
          <h5>People visiting your profile will see the following info</h5>
          <form encType="multipart/form-data" className='settings-form' onSubmit={handleSubmit}>
            <div className='profile-picture-setting'>
              <h6>Photo</h6>
              <div className='photo-and-button'>
                {profilePic ? <img id='profile-picture-display' src={previewPic}></img> : <img id='profile-picture-display' src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686473703/Untitled_design_4_jhphmw.png"></img>}
                <button id='file-input-actual-button' type='button' onClick={handleClick}>Change</button>
                <input 
                  className='file-input-button'
                  type="file"
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              <div className='name-info'>
                <div className='first-name-info'>
                  <h6>First name</h6>
                  <input className='first-name-input' value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)} />
                {errors.firstName ? <p className='settings-form-errors'>{errors.firstName}</p> : null}
                </div>
                <div className='last-name-info'>
                  <h6>Last name</h6>
                  <input className='first-name-input' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {errors.lastName ? <p className='settings-form-errors'>{errors.lastName}</p> : null}
                </div>
              </div>
              <div className='about-info'>
                <h6>About</h6>
                <textarea name="About" className='input-about' type="text" value={about} placeholder="Tell your story" onChange={(e) => setAbout(e.target.value)}>
                </textarea>
                {errors.about ? <p className='settings-form-errors'>{errors.about}</p> : null}
              </div>
              <div className='pronoun-info'>
                <h6>Pronouns</h6>
                <div className='pronoun-select-list'>
                  <Dropdown isSearchable={true} value={pronouns} placeHolder={pronouns ? pronouns : "Add Your Pronouns"} options={options} setter={(x) => setPronouns(x)}/>
                </div>
                <div className='pronoun-description'>
                  <h6>Choose a sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time.</h6>
                </div>
              </div>
              <div className='website-info'>
                <h6>Website</h6>
                <input type="url" className='website-input' value={website} placeholder='Add a link to drive traffic to your site' onChange={(e) => setWebsite(e.target.value)} />
                {errors.website ? <p className='settings-form-errors'>{errors.website}</p> : null}
              </div>
              <div className='username-info'>
                <h6>Username</h6>
                <input type="text" className='username-input' value={username} placeholder='Choose wisely so others can find you' onChange={(e) => setUsername(e.target.value)} />
                {errors.username ? <p className='settings-form-errors'>{errors.username}</p> : null}
              </div>
            </div>
            <div className='footer-div'>
              <button type="submit" className='save-button'>Save</button>
              <NavLink exact to={`/${user?.username}`}>
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
