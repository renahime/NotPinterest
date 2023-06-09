import { useDispatch, useSelector } from "react-redux"
import { getPinById } from "../../store/pins"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./PinDropdown.css";
import "./IndividualPinPage.css"
import OpenModalButton from '../OpenModalButton';
import EditPinModal from "./EditPinModal";
import ComingSoon from "./ComingSoonModal";
import Dropdown from "./Dropdown";
import { pinThunk } from "../../store/boards";
import "./IndividualPinPage.css"
import { Link } from "react-router-dom"
import { getBoardsofCurrentUser } from "../../store/boards"
import { unfollowUser, followUser } from "../../store/session"
import { useModal } from "../../context/Modal";
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
    const singlePinWithBoardState = useSelector(state => state)
    const { closeModal } = useModal();
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [showDetails, setShowDetails] = useState(false)



    console.log("currentUserBoards", singlePin)
    useEffect(() => {
        dispatch(getPinById(id))
        dispatch(getBoardsofCurrentUser())
    }, [dispatch, id])


    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }
    let grabBoardName = {}
    let pinnedCheck = false
    let options = [];
    if (singlePin && currentUser) {
        for (let userBoard of currentUser.boards) {
            for (let pin of userBoard.pins) {
                if (pin == singlePin.id) {
                    pinnedCheck = true;
                    grabBoardName.name = userBoard.name
                }
            }
            options.push({ 'value': userBoard.name, 'label': userBoard.name })
        }
    }
    const [board, setBoard] = useState(grabBoardName?.name)
    const [pinBoard, setPinBoard] = useState(grabBoardName?.name)
    console.log(singlePin)
    useEffect(() => {
        const handler = () => setShowMenu(false)
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler)
        }
    })

    const changeBoardName = (newBoard) => {
        // Update the name in the component's state
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
        for (let board of currentUser.boards) {
            if (board.name == pinBoard) {
                boardId = board.id
                sendBoardName = board.name.split(' ').join('_').toLowerCase()
            }
        }
        const pin = await dispatch(pinThunk(singlePin, boardId)).then(closeModal())
        if (pin) {
            return history.push(`/${currentUser.username}/${sendBoardName}`)
        }
    }
    async function unfollow(username) {
        let response = await dispatch(unfollowUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else {
            console.log("i work")
        }
    }

    async function follow(username) {
        console.log("username", username)
        let response = await dispatch(followUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else {
            console.log("i work too")
        }
    }

    if (!singlePin) return <h1>...Loading</h1>

    let singlePinImageClassName = showDetails ? "single-pin-image-button" : "single-pin-image-button hidden"


    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    if (!singlePin || !currentUser || !options.length) return <h1>...Loading</h1>
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
                        <div className="dropdown-container">
                            <div onClick={handleInputClick} className="dropdown-input">
                                <div className="dropdown-selected-value"></div>
                                <div className="dropdown-tools">
                                    <div className="dropdown-tool">
                                        <Icon />
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-menu">
                                {pinnedCheck ? showMenu &&
                                    <>
                                        <OpenModalButton
                                            buttonText="Edit Pin"
                                            className="dropdown-item"
                                            modalComponent={<EditPinModal originalBoardName={grabBoardName.name} grabBoardName={grabBoardName} pin={singlePin} />}
                                        />
                                        <OpenModalButton
                                            buttonText="Report Pin"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />}
                                        />
                                        <OpenModalButton
                                            buttonText="Get Pin embed code"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />}
                                        />
                                    </>
                                    : showMenu &&
                                    <>
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
                                        <OpenModalButton
                                            buttonText="Get Pin embed code"
                                            className="dropdown-item"
                                            modalComponent={<ComingSoon />} />
                                    </>
                                }
                            </div>
                        </div>
                        <Dropdown parentCallBack={changeBoardName} placeHolder={Object.keys(grabBoardName).length ? grabBoardName.name : options[0].label} options={options} isSearchable={true} user={currentUser} pin={singlePin} />
                        <button onClick={handlePin} className="single-pin-edit-board-button">Save</button>
                    </div>
                    <div> {singlePin.title ? <h2 className="single-pin-title">{singlePin.title}</h2> : null} </div>
                    <div className="single-pin-owner-info">
                        <div className="single-pin-profile-info">
                            <div>
                                {singlePin.profile_image ? <img className="single-pin-profile-image" src={singlePin.profile_image} /> : <i className=" single-pin-profile-default fa-solid fa-circle-user"></i>}
                            </div>
                            <div className="single-pin-owner-name-followers">
                                <Link className="single-pin-owner-link" to={`/${singlePin.owner_info?.username}`}>{singlePin.owner_info?.first_name} {singlePin.owner_info?.last_name}</Link>
                                <p>{formatFollowers(singlePin?.owner_info?.followers.length)}</p>
                            </div>
                        </div>
                        <div>
                            {currentUser && currentUser.id !== singlePin.owner_id && !singlePin.owner_info?.followers.includes(currentUser.username) ? <button onClick={() => follow(singlePin.user.username)} className="single-pin-follow-button">Follow</button> : null}
                            {currentUser && currentUser.id !== singlePin.owner_id && singlePin.owner_info?.followers.includes(currentUser.username) ? <button onClick={() => unfollow(singlePin.user.username)} className="single-pin-following-button">Following</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
