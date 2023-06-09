import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, clearProfile } from "../../store/profile"
import { getBoardsByUsername } from "../../store/boards"
import { findFollowersAndFollowing, unfollowUser, followUser } from "../../store/session"
import CurrentUserBoard from "../UserBoards/CurrentUserBoard"
import NotUSerProfile from "../UserBoards/NotUserProfile"
import PageNotFound from "../PageNotFound"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./ProfilePage.css"

import OpenModalButton from "../OpenModalButton"
import CreateBoardModal from "../CreateBoardModal"


export default function ProfilePage() {
    const history = useHistory()
    const { username } = useParams()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const currentProfile = useSelector(state => state.profile.currentProfile)
    const currentUser = useSelector(state => state.session.user)
    let userBoards = useSelector(state => state.boards.currentProfileBoards)
    let userBoardsArr = Object.values(userBoards)
    let [numFollowers, setNumFollowers] = useState(0);
    let [numFollowing, setNumFollowing] = useState(0)
    let [isfollowing, setIsFollowing] = useState(false);


    let showMenu = () => {
        setOpenMenu(!openMenu)
    }

    let checkUser = () => {
        if (currentUser.username === currentProfile.username) return true
        else return false
    }

    const handleFollow = async (e) => {
        e.preventDefault();
        let response = await dispatch(followUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else if (response) {
            setNumFollowers(numFollowers => numFollowers + 1)
            setIsFollowing(true);
        }
    }
    const handleUnfollow = async (e) => {
        e.preventDefault();
        let response = await dispatch(unfollowUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else if (response) {
            setNumFollowers(numFollowers => numFollowers - 1)
            setIsFollowing(false);
        }
    }

    useEffect(() => {
        dispatch(getUserInfo(username)).then(() => setLoading(true))
        dispatch(clearProfile())
    }, [dispatch])

    useEffect(() => {
        if (!loading && !currentProfile.id) {
            return
        }
        if (!Object.values(currentProfile).length) return
        else {
            setNumFollowers(currentProfile.followers.length)
            setNumFollowing(currentProfile.following.length)
            dispatch(getBoardsByUsername(username))
            dispatch(findFollowersAndFollowing(username))
        }
        if (Object.values(currentProfile).length && Object.values(currentUser).length) {
            if (currentProfile.followers.includes(currentUser.username)) {
                setIsFollowing(true);
            }
        }
    }, [loading, currentProfile])

    let menuClassName = openMenu ? "profile-menu" : "hidden profile-menu"

    if (!loading) return <h1>Loading...</h1>
    else if (!currentProfile.id) return <PageNotFound />

    return (!Object.values(currentProfile).length || !Object.values(currentUser).length ? <h1>Loading...</h1> :
        <div>
            {currentProfile.id &&
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
                            {numFollowers === 1 ? "1 follower" : `${numFollowers} followers`}
                        </div>
                        <i className="fa-solid fa-circle profile-followers-and-following-dot"></i>
                        <div>
                            {numFollowing} following
                        </div>
                    </h5>
                    {checkUser() ?
                        <NavLink exact to="/settings"><button className="profile-button edit-profile">Edit Profile</button></NavLink> :
                        !isfollowing ?
                            <button onClick={handleFollow} className="profile-button" id="follow-button">Follow</button> :
                            <button id="unfollow-button" className="profile-button" onClick={handleUnfollow}>Unfollow</button>
                    }
                    <div>
                        <button onClick={() => history.push(`/${username}/_created`)} className="profile-button">Created</button>
                        <button onClick={() => history.push(`/${username}/_saved`)} className="profile-button">Saved</button>
                    </div>
                </div>
            }
            {checkUser() ?
                <div>
                    <div className="profile-plus-icon-wrapper">
                        <button onClick={showMenu} className="profile-plus-button">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        {openMenu && <div className={menuClassName}>
                            <div className="profile-dropdown-create-label">Create</div>
                            <div className="profile-dropdown-create">Pin</div>
                            <div className="profile-dropdown-create" onClick={showMenu}>
                                <OpenModalButton
                                    buttonText="Board"
                                    modalComponent={<CreateBoardModal username={currentUser?.username} />}
                                />
                            </div>
                        </div>}
                    </div>
                    <CurrentUserBoard userBoardsArr={userBoardsArr} />
                </div>
                :
                <NotUSerProfile userBoardsArr={userBoardsArr} />
            }

        </div>
    )
}
