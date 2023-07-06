import { useDispatch, useSelector } from "react-redux"
import { getPinById, clearSinglePin } from "../../store/pins"
import { getCurrentUserBoards } from "../../store/boards"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./PinDropdown.css";
import "./IndividualPinPage.css"
import OpenModalButton from '../OpenModalButton';
import EditPinModal from "./EditPinModal";
import ComingSoon from "./ComingSoonModal";
import Dropdown from "./Dropdown";
import { pinThunk } from "../../store/boards";
import { useModal } from "../../context/Modal";
import "./IndividualPinPage.css"
import { Link } from "react-router-dom"
import { unfollowUser, followUser } from "../../store/session"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Icon = () => {
    return (
        <button className="single-pin-ellipsis"><i className="fa-solid fa-ellipsis"></i></button>
    );
};

export default function IndividualPinPage() {
    const [showMenu, setShowMenu] = useState(false)
    const singlePin = useSelector(state => state.pins.singlePin)
    const currentUser = useSelector(state => state.session.user)
    // const pinOwnerProfile = useSelector(state => state.session.currentProfile)
    const currentUserBoards = useSelector(state => state.boards.currentUserBoards)
    const { closeModal } = useModal();
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [showDetails, setShowDetails] = useState(false)
    const [pinErrorCheck, setPinErrorCheck] = useState(false);
    let [numFollowers, setNumFollowers] = useState(0);
    let [isfollowing, setIsFollowing] = useState(false);
    const { setModalContent } = useModal()


    
    useEffect(() => {
        dispatch(getPinById(id))
        if (!Object.values(currentUserBoards)) {
            dispatch(getCurrentUserBoards())
        }        
        return (() => dispatch(clearSinglePin()))
    }, [dispatch, id])

    let grabBoardName = {}
    let pinnedCheck = false
    let options = [];
    if (currentUser) {
        if (Object.values(singlePin).length && Object.values(currentUser).length) {
            if (singlePin.user.id == currentUser.id) {
                pinnedCheck = true
            }
            for (let userBoard of Object.values(currentUserBoards)) {
                for (let board of singlePin.boards_pinned_in) {
                    if (board.id == userBoard.id) {
                        pinnedCheck = true;
                        grabBoardName.name = userBoard.name
                    }
                }
                options.push({ 'value': userBoard.name, 'label': userBoard.name })
            }
        }
    }

    useEffect(() => {
        if (currentUser) {
            if (Object.values(singlePin).length && Object.values(currentUser).length) {
                setNumFollowers(singlePin.user.followers.length)
                if (singlePin.user.followers.includes(currentUser.username)) {
                    setIsFollowing(true);
                }
            }
        }
    }, [singlePin, currentUser])

    const [pinBoard, setPinBoard] = useState(grabBoardName?.name)
    useEffect(() => {
        const handler = () => setShowMenu(false)
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler)
        }
    })

    // console.log("pinOwnerProfile", pinOwnerProfile)
    const changeBoardName = (newBoard) => {
        setPinBoard(newBoard)
    }

    const handleInputClick = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }
    const handlePin = async (e) => {
        e.preventDefault();
        let boardId
        let sendBoardName
        for (let board of Object.values(currentUserBoards)) {
            if (board.name == pinBoard) {
                boardId = board.id
                sendBoardName = board.name.split(' ').join('_').toLowerCase()
            }
        }
        if (!sendBoardName) {
            setPinErrorCheck(true);
            return
        }
        const pin = await dispatch(pinThunk(singlePin, boardId)).then(closeModal())
        if (pin) {
            return history.push(`/${currentUser.username}/${sendBoardName}`)
        }
    }
    const handleFollow = async (e) => {
        e.preventDefault();
        let response = await dispatch(followUser(singlePin.user.username))
        if (response.errors) {
            console.log(response.errors)
        } else if (response) {
            setNumFollowers(numFollowers => numFollowers + 1)
            setIsFollowing(true);
        }
    }
    const handleUnfollow = async (e) => {
        e.preventDefault();
        let response = await dispatch(unfollowUser(singlePin.user.username))
        if (response.errors) {
            console.log(response.errors)
        } else if (response) {
            setNumFollowers(numFollowers => numFollowers - 1)
            setIsFollowing(false);
        }
    }
    if (!singlePin) return <h1>...Loading</h1>

    let singlePinImageClassName = showDetails ? "single-pin-image-button" : "single-pin-image-button hidden"

    console.log("options", options)
    if (!Object.values(singlePin).length) return <h1>...Loading</h1>
    return (
        <div className="single-pin-wrapper">
            <div className="single-pin">
                <div className="single-pin-image-wrapper" onMouseEnter={() => setShowDetails(!showDetails)} onMouseLeave={() => setShowDetails(!showDetails)}>
                    <img className="single-pin-image" src={singlePin.image} alt={singlePin.alt_text ? singlePin.alt_text : ""} />
                    {singlePin.destination ?
                        <a target="_blank" href={singlePin.destination}>
                            <button className={singlePinImageClassName}>
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                {singlePin.destination}
                            </button>
                        </a>
                        :
                        <a target="_blank" href={singlePin.image}>
                            <button className={singlePinImageClassName}>
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                View image
                            </button>
                        </a>
                    }
                </div>
                <div className="single-pin-details">
                    <div className="single-pin-edit-board">
                        <div className="dropdown-container-edit-pin">
                            <div onClick={handleInputClick} className="dropdown-input">
                                <div className="dropdown-selected-value"></div>
                                <div className="dropdown-tools">
                                    <div className="dropdown-tool">
                                        <Icon />
                                    </div>
                                </div>
                            </div>
                            <div id="dropdown-menu-wrapper" className="dropdown-menu-edit-pin">
                                {pinnedCheck ? showMenu &&
                                    <div className="edit-pin-options">
                                        <div onClick={() => setModalContent(<EditPinModal originalBoardName={grabBoardName.name} grabBoardName={grabBoardName} pin={singlePin} />)} id="edit-pin-button" className="dropdown-item">
                                            Edit Pin
                                        </div>
                                    </div>
                                    : showMenu &&
                                    <div>
                                        <OpenModalButton
                                            buttonText="Download Image"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />}
                                        />
                                        <OpenModalButton
                                            buttonText="Hide Pin"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />} />
                                        <OpenModalButton
                                            buttonText="Report Pin"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />} />
                                        {/* <OpenModalButton
                                            buttonText="Get Pin embed code"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />} /> */}
                                    </div>
                                }
                            </div>
                        </div>

                        {!currentUser ? null : (<> <Dropdown parentCallBack={changeBoardName} placeHolder={Object.keys(grabBoardName).length ? grabBoardName.name : options[0].label} options={options} isSearchable={true} />
                            <div className="pin-with-error"><button onClick={handlePin} className="single-pin-edit-board-button">Save</button> </div>  </>)}
                    </div>
                    <p style={{ color: 'red' }}>{pinErrorCheck ? "A board was not recognized to be pinned" : null}</p>
                    <div> {singlePin.title ? <h2 className="single-pin-title">{singlePin.title}</h2> : null} </div>
                    <div> {singlePin.description ? <h2 className="single-pin-title">{singlePin.description}</h2> : null} </div>
                    <div> {singlePin.destination ? <h2 className="single-pin-title">{singlePin.destination}</h2> : null} </div>
                    <div> {singlePin.alt_text ? <h2 className="single-pin-title">{singlePin.alt_text}</h2> : null} </div>
                    <div className="single-pin-owner-info">
                        <div className="single-pin-profile-info">
                            <div>
                                {singlePin.user?.profile_image ? <img className="single-pin-profile-image" src={singlePin.user.profile_image} /> : <i className=" single-pin-profile-default fa-solid fa-circle-user"></i>}
                            </div>
                            <div className="single-pin-owner-name-followers">
                                <Link className="single-pin-owner-link" to={`/${singlePin.user?.username}`}>{singlePin.user?.first_name} {singlePin.user?.last_name}</Link>
                                {!currentUser ? <p>{singlePin.user.followers.length === 1 ? "1 follower" : `${singlePin.user.followers.length} followers`}</p> : <p>{numFollowers === 1 ? "1 follower" : `${numFollowers} followers`}</p>}
                            </div>
                        </div>
                        <div>
                            {currentUser && (currentUser.id !== singlePin.owner_id) ?
                                <>
                                    {!isfollowing ? (<button onClick={handleFollow} className="profile-button" id="follow-button">Follow</button>) : (<button id="unfollow-button" className="profile-button" onClick={handleUnfollow}>Unfollow</button>)}
                                </> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
