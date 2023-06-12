import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../../store/profile"
import { unfollowUser, followUser } from "../../store/session"
import CurrentUserBoard from "../UserBoards/CurrentUserBoard"
import NotUSerProfile from "../UserBoards/NotUserProfile"
import PageNotFound from "../PageNotFound"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import LoadingButton from "../LoadingButton"
import "./ProfilePage.css"
import UserPins from '../UserPins'
import OpenModalButton from "../OpenModalButton"
import CreateBoardFromProfile from '../CreateBoardModal/CreateBoardFromProfile'

export default function ProfilePage() {
    const history = useHistory()
    const { username } = useParams()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const currentProfile = useSelector(state => state.profile.currentProfile)
    const currentUser = useSelector(state => state.session.user)
    let [numFollowers, setNumFollowers] = useState(0);
    let [numFollowing, setNumFollowing] = useState(0)
    let [isfollowing, setIsFollowing] = useState(false);
    let [showBoards, setShowBoards] = useState(true);
    let [usingProfile, setUsingProfile] = useState(false);

    console.log(currentUser)

    let current = currentUser;


    useEffect(() => {
        if (!checkUser()) {
            dispatch(getUserInfo(username)).then(() => setLoading(true));
            setUsingProfile(true)
        } else {
            setLoading(true);
        }
    }, [dispatch, username, currentUser])

    console.log('b')
    console.log(usingProfile)


    let showMenu = () => {
        setOpenMenu(!openMenu)
    }
    let checkUser = () => {
        if (currentUser && (currentUser.username == username)) return true
        else return false
    }

    if (checkUser()) {
        current = currentUser;
        console.log('a')
    } else {
        current = currentProfile
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
        if (!loading && !current.id) {
            return
        }
        if (!Object.values(current).length) return
        else {
            setNumFollowers(current.followers.length)
            setNumFollowing(current.following.length)
        }
        if (currentUser) {
            if (Object.values(current).length && Object.values(currentUser).length) {
                if (current.followers.includes(currentUser.username)) {
                    setIsFollowing(true);
                }
            }
        }
    }, [loading, current, currentUser])

    const handleShowBoards = (e) => {
        e.stopPropagation();
        setShowBoards(true);
    };

    const handleShowPins = (e) => {
        e.stopPropagation();
        setShowBoards(false);
    };



    let menuClassName = openMenu ? "profile-menu" : "hidden profile-menu"

    if (!loading) return <h1>Loading...</h1>
    else if (!current.id) return <PageNotFound />

    console.log(current);

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
                            {numFollowers === 1 ? "1 follower" : `${numFollowers} followers`}
                        </div>
                        <i className="fa-solid fa-circle profile-followers-and-following-dot"></i>
                        <div>
                            {numFollowing} following
                        </div>
                    </h5>
                    {checkUser() ?
                        <Link to={{ pathname: "/settings", state: { current } }}  ><button className="profile-button edit-profile">Edit Profile</button></Link> :
                        !isfollowing ?
                            <button onClick={handleFollow} className="profile-button" id="follow-button">Follow</button> :
                            <button id="unfollow-button" className="profile-button" onClick={handleUnfollow}>Unfollow</button>
                    }
                    <div>
                        <button onClick={handleShowBoards} className="profile-button">Pins</button>
                        <button onClick={handleShowPins} className="profile-button">Boards</button>
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
                                <div>
                                    <OpenModalButton
                                        buttonText="Board"
                                        modalComponent={<CreateBoardFromProfile username={current?.username} />} >
                                    </OpenModalButton>
                                </div>
                            </div>
                        </div>}
                    </div> {checkUser() && !showBoards ? <CurrentUserBoard userBoardsArr={current.boards} username={current.username} profilePicture={current.profile_image} /> : <><UserPins pins={current.pins}> </UserPins></>}
                </div>
                :
                <div>
                    {!showBoards ? <NotUSerProfile userBoardsArr={current.boards} username={current.username} profilePicture={current.profile_image} /> : <><UserPins pins={current.pins}> </UserPins></>}
                </div>
            }
        </div>
    )
}
