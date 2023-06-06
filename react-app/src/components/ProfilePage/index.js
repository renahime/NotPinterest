import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, clearProfile } from "../../store/profile"
import { getBoardsByUsername } from "../../store/boards"
import CurrentUserBoard from "../UserBoards/CurrentUserBoard"
import NotUSerProfile from "../UserBoards/NotUserProfile"
import "./ProfilePage.css"


export default function ProfilePage() {
    const { username } = useParams()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const currentProfile = useSelector(state => state.profile.currentProfile)
    const currentUser = useSelector(state => state.session.user)
    let userBoards = useSelector(state => state.boards.currentProfileBoards)
    let userBoardsArr = Object.values(userBoards)

    let showMenu = () => {
        setOpenMenu(!openMenu)
    }
    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    let checkUser = () => {
        if (currentUser.username === currentProfile.username) return true
        else return false
    }
    useEffect(() => {
        dispatch(getUserInfo(username))
        dispatch(getBoardsByUsername(username))
        return (() => dispatch(clearProfile()))
    }, [dispatch])

    let menuClassName = openMenu ? "profile-menu" : "hidden profile-menu"

    return (
        <div>
            {currentProfile &&
                <div className="profile-page-base">
                    {currentProfile.profile_image ? <img className="profile-image" src={currentProfile.profile_image} /> :
                        <i className="fa-solid fa-circle-user profile-image-default"></i>
                    }
                    <h2 className="profile-user-name">{currentProfile.first_name} {currentProfile.last_name}</h2>
                    <h4 className="profile-name-pronouns">
                        <div>@{currentProfile.username}</div>
                        {
                            currentProfile.pronouns ?
                                <div className="profile-pronouns">
                                    <i className="fa-solid fa-circle profile-pronouns-dot"></i>
                                    {currentProfile.pronouns}
                                </div>
                                : null
                        }
                    </h4>
                    {currentProfile.about ? <h5 className="profile-about-section">{currentProfile.about}</h5> : null}
                    <h5 className="profile-followers-and-following">
                        <div>
                            {formatFollowers(currentProfile.follower_count)}

                        </div>
                        <i className="fa-solid fa-circle profile-followers-and-following-dot"></i>
                        <div>
                            {currentProfile.following_count} following
                        </div>
                    </h5>
                    {checkUser() ? 
                    <button className="profile-button edit-profile">Edit Profile</button> : 
                    <button className="profile-button" id="follow-button">Follow</button>
                    }
                    <div>
                        <button className="profile-button">Created</button>
                        <button className="profile-button">Saved</button>
                    </div>
                </div>
            }
            { checkUser() ?
            <div>
                <div className="profile-plus-icon-wrapper">
                    <button onClick={showMenu} className="profile-plus-button">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    {openMenu && <div className={menuClassName}>
                        <div className="profile-dropdown-create-label">Create</div>
                        <div className="profile-dropdown-create">Pin</div>
                        <div className="profile-dropdown-create">Board</div>
                    </div>}
                </div>
                <CurrentUserBoard userBoardsArr={userBoardsArr}/> 
            </div>
            : 
            <NotUSerProfile userBoardsArr={userBoardsArr} />
        }
        
        </div>
    )
}