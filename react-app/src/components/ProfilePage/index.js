import { useEffect, useState } from "react"
import { useParams, useHistory, Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../../store/session"
import { unfollowUser, followUser, clearProfile } from "../../store/session"
import { getOtherUserBoards, getCurrentUserBoards } from "../../store/boards"
import { getCurrentUserPins, getOtherUserPins } from "../../store/pins"
import CurrentUserBoard from "../UserBoards/CurrentUserBoard"
import NotUSerProfile from "../UserBoards/NotUserProfile"
import PageNotFound from "../PageNotFound"
import LoadingButton from "../LoadingButton"
import "./ProfilePage.css"
import UserPins from '../UserPins'
import OpenModalButton from "../OpenModalButton"
import CreateBoardFromProfile from '../CreateBoardModal/CreateBoardFromProfile'
import CreateBoardModal from "../CreateBoardModal"
import LoginError from "../LoginError"

export default function ProfilePage() {
    const history = useHistory()
    const { username } = useParams()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const currentProfile = useSelector(state => state.session.currentProfile)
    const currentProfileFollowers = useSelector(currentProfile ? state => state.session.currentProfile.followers : null)
    const currentProfileFollowing = useSelector(currentProfile ? state => state.session.currentProfile.following : null)
    const currentUser = useSelector(state => state.session.user)
    const currentUserFollowing = useSelector(state => state.session.user.following)
    const currentUserFollowers = useSelector(state => state.session.user.followers)
    const currentUserBoards = useSelector(state => state.boards.currentUserBoards)
    const currentUserPins = useSelector(state => state.pins.currentUserPins)
    const currentProfilePins = useSelector(state => state.pins.currentProfilePins)
    const otherUserBoards = useSelector(state => state.boards.currentProfileBoards)
    let [showBoards, setShowBoards] = useState(true);
    const [showPins, setShowPins] = useState(false)
    let [usingProfile, setUsingProfile] = useState(false);

    let current = currentUser;

    useEffect(() => {
        if (!checkUser()) {
            dispatch(getUserInfo(username)).then(() => dispatch(getOtherUserBoards(username))).then(() => dispatch(getOtherUserPins(username))).then(() => setLoading(true));
            setUsingProfile(true)
        } else {
            dispatch(getCurrentUserBoards()).then(() => dispatch(getCurrentUserPins())).then(() => setLoading(true))
        }
        return (() => {
            if (!checkUser) {
                dispatch(clearProfile())
            }
        })
    }, [dispatch])
    // }, [dispatch, username, currentUser])



    let showMenu = () => {
        setOpenMenu(!openMenu)
    }
    let checkUser = () => {
        if (currentUser && (currentUser.username == username)) return true
        else return false
    }

    if (checkUser()) {
        current = currentUser;
    } else {
        current = currentProfile
    }

    const handleFollow = async (e) => {
        e.preventDefault();
        let response = await dispatch(followUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else if (response) {
            // setNumFollowers(numFollowers => numFollowers + 1)
            // setIsFollowing(true);
        }
    }
    const handleUnfollow = async (e) => {
        e.preventDefault();
        let response = await dispatch(unfollowUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else if (response) {
            // setNumFollowers(numFollowers => numFollowers - 1)
            // setIsFollowing(false);
        }
    }

    const pins = useSelector(state => state.pins.pins)


    // useEffect(() => {
    //     if (!loading && !current.id) {
    //         return
    //     }
    //     if (!Object.values(current).length) return
    //     else {
    //         setNumFollowers(current.followers.length)
    //         setNumFollowing(current.following.length)
    //     }
    //     if (currentUser) {
    //         if (Object.values(current).length && Object.values(currentUser).length) {
    //             if (current.followers.includes(currentUser.username)) {
    //                 setIsFollowing(true);
    //             }
    //         }
    //     }
    // }, [loading, current, currentUser])

    const handleShowBoards = (e) => {
        e.stopPropagation();
        setShowBoards(true);
        setShowPins(false)
    };

    const handleShowPins = (e) => {
        e.stopPropagation();
        setShowBoards(false);
        setShowPins(true)
    };

    let formatFollowersOutput = () => {
        if (currentProfileFollowers) {
            if (currentProfileFollowers.length === 1) {
                return "1 follower"
            } else {
                return `${currentProfileFollowers.length} followers`
            }
        } else {
            if (currentUserFollowers.length === 1) {
                return "1 follower"
            } else {
                return `${currentUserFollowers.length} followers`

            }
        }
    }

    // If we click off of the Create tab, the modal will dissapear
    useEffect(() => {
        const handleClick = (event) => {
            if (openMenu === true) {
                setOpenMenu(false)
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [openMenu]);


    let menuClassName = openMenu ? "profile-menu" : "hidden profile-menu"

    if (!loading) return <h1>Loading...</h1>
    else if (!current.id) return <PageNotFound />

    if (!currentUser) {
        return <LoginError></LoginError>
    }

    return (!Object.values(current).length ? <h1>Loading...</h1> :
        <div>
            {current.id &&
                <div className="profile-page-base">
                    {current.profile_image ? <img className="profile-image" src={current.profile_image} /> :
                        <i className="fa-solid fa-circle-user profile-image-default"></i>
                    }
                    <h2 className="profile-user-name">{current.first_name} {current.last_name}</h2>
                    <h4 className="profile-name-pronouns">
                        <div>@{current.username}</div>
                        {
                            current.pronouns ?
                                <div className="profile-pronouns">
                                    <i className="fa-solid fa-circle profile-pronouns-dot"></i>
                                    {current.pronouns}
                                </div>
                                : null
                        }
                    </h4>
                    {current.about ? <h5 className="profile-about-section">{current.about}</h5> : null}
                    <h5 className="profile-followers-and-following">
                        <div>
                            {formatFollowersOutput()}
                        </div>
                        <i className="fa-solid fa-circle profile-followers-and-following-dot"></i>
                        <div>
                            {currentProfileFollowing ? currentProfileFollowing.length : currentUserFollowing.length} following
                        </div>
                    </h5>
                    {checkUser() ?
                        <Link to={{ pathname: "/settings", state: { current } }}  ><button className="profile-button edit-profile">Edit Profile</button></Link> :
                        currentUserFollowing.includes(currentProfile.username) ?
                            <button id="unfollow-button" className="profile-button" onClick={handleUnfollow}>Unfollow</button>
                            :
                            <button onClick={handleFollow} className="profile-button" id="follow-button">Follow</button>
                    }
                    <div>

                        <button onClick={handleShowBoards} className={showPins ? "profile-button" : "profile-button underline"}>Pins</button>
                        <button onClick={handleShowPins} className={showBoards ? "profile-button" : "profile-button underline"}>Boards</button>
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
                            <NavLink style={{ textDecoration: 'none', width: "100%", textAlign: 'left', color: 'black' }} to="/create"> <div className="profile-dropdown-create">Pin</div> </NavLink>
                            <div className="" onClick={showMenu}>
                                <div>
                                    <OpenModalButton
                                        buttonText="Board"
                                        modalComponent={<CreateBoardModal username={current?.username} current={current} />} >
                                    </OpenModalButton>
                                </div>
                            </div>
                        </div>}
                    </div> {checkUser() && !showBoards ? <CurrentUserBoard userBoardsArr={Object.values(currentUserBoards)} current={current} username={current.username} profilePicture={current.profile_image} /> : <><UserPins pins={currentUserPins}> </UserPins></>}
                </div>
                :
                <div className="user-profile-bottom-wrapper">
                    {!showBoards ? <NotUSerProfile userBoardsArr={Object.values(otherUserBoards)} username={current.username} profilePicture={current.profile_image} /> : <><UserPins pins={currentProfilePins}> </UserPins></>}
                </div>
            }
        </div>
    )
}
