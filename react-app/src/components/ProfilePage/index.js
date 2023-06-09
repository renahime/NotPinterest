import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, clearProfile } from "../../store/profile"
import { getBoardsByUsername } from "../../store/boards"
import { findFollowersAndFollowing, unfollowUser, followUser } from "../../store/session"
import CurrentUserBoard from "../UserBoards/CurrentUserBoard"
import NotUSerProfile from "../UserBoards/NotUserProfile"
<<<<<<< HEAD
import PageNotFound from "../PageNotFound"
=======
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
>>>>>>> dev
import "./ProfilePage.css"


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
<<<<<<< HEAD
    const followers = useSelector(state => state.session.followers)
    const following = useSelector(state => state.session.following)
    let [followingInt, setFollowing] = useState("")

    // let followingArr
    // let followersArr

    // if (following || followers) {
    //     followingArr = Object.values(following)
    //     followersArr = Object.values(followers)
    // }

=======
>>>>>>> dev
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

    // async function unfollow(username) {
    //     // console.log("username", username)
    //     let response = await dispatch(unfollowUser(username))
    //     if (response.errors) {
    //         console.log(response.errors)
    //     } else {
    //         // console.log("i work")
    //         setFollowing(followingInt--)
    //     }
    // }

    // async function follow(username) {
    //     // console.log("username", username)
    //     let response = await dispatch(followUser(username))
    //     if (response.errors) {
    //         console.log(response.errors)
    //     } else {
    //         // console.log("i work too")
    //         setFollowing(followingInt++)
    //     }
    // }


    useEffect(() => {
        setTimeout(async () => {
            console.log("is this working")
            await dispatch(getUserInfo(username)).then(() => setLoading(true))
        }, 1000)
        return (() => dispatch(clearProfile()))
    }, [dispatch])

    useEffect(() => {
        if (!loading && !currentProfile.id) {
            console.log("we stopped you")
            return}
        if (!Object.values(currentProfile).length) return
        else {
            setTimeout(() => {
                console.log("we up in here")
                dispatch(getBoardsByUsername(username))
                dispatch(findFollowersAndFollowing(username))

            }, 2000)
            console.log("currentuser in useeffect", currentUser)
        }
    }, [loading, currentProfile])
    // console.log("howdy yalllll")
    // console.log("currentuser outside useeffect", currentProfile.owner_info)
    
    
    let menuClassName = openMenu ? "profile-menu" : "hidden profile-menu"

    // console.log("hiiiiiiiiiiiii")
    // console.log("currentProfileId", currentProfile.id)
    if (!loading) return <h1>Loading...</h1>
    else if (!currentProfile.id) return <PageNotFound />

    console.log("hello", loading)
    return (
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
                            {followers ? formatFollowers(Object.values(followers).length) : null}
                        </div>
                        <i className="fa-solid fa-circle profile-followers-and-following-dot"></i>
                        <div>
                            {following ? Object.values(following).length : null} following
                        </div>
                    </h5>
<<<<<<< HEAD
                    {checkUser() ? 
                    <button className="profile-button edit-profile">Edit Profile</button> : 
                    !currentUser.followers.includes(currentProfile.owner_info.username) ?
                        <button onClick={() => followUser(currentProfile.owner_info.username)} className="profile-button" id="follow-button">Follow</button> :
                        <button onClick={() => unfollowUser(currentProfile.owner_info.username)}>Unfollow</button>
=======
                    {checkUser() ?
                        <NavLink exact to="/settings"><button className="profile-button edit-profile">Edit Profile</button></NavLink> : null}
                    {
                        <button className="profile-button" id="follow-button">Follow</button>
>>>>>>> dev
                    }
                    {/* <div>
                        <button onClick={() => history.push(`/${username}/_created`)} className="profile-button">Created</button>
                        <button onClick={() => history.push(`/${username}/_saved`)} className="profile-button">Saved</button>
                    </div> */}
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
                            <div className="profile-dropdown-create">Board</div>
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
