import { useDispatch, useSelector } from "react-redux"
import { getPinById } from "../../store/pins"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./PinDropdown.css";
import "./IndividualPinPage.css"
import { Link } from "react-router-dom"
import { getBoardsofCurrentUser } from "../../store/boards"
import { unfollowUser, followUser } from "../../store/session"
import OpenModalButton from '../OpenModalButton';
import EditPinModal from "./EditPinModal";
import ComingSoon from "./ComingSoonModal";
import Dropdown from "./Dropdown";
import { pinThunk } from "../../store/boards";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Icon = () => {
    return (
        <button className="single-pin-ellipsis"><i className="fa-solid fa-ellipsis"></i></button>
    );
};

export default function IndividualPinPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history=useHistory()
    // const [board, setBoard] = useState("")
    const singlePin = useSelector(state => state.pins.singlePin)
    const currentUser = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    const currentUserBoards = useSelector(state => state.boards.currentUserBoards)
    console.log("CURERNT USER BOARDS - individual pin page", currentUserBoards)
    const currentUserBoardsArr = Object.values(currentUserBoards)
    let grabBoardName = {}
    let pinnedCheck = false
    let options = [];
    if (singlePin && currentUser && isLoaded == true) {
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
        for (let board of currentUser.boards) {
            if (board.name == pinBoard) {
                boardId = board.id
            }
        }

        console.log(boardId)

        const pinId = await dispatch(pinThunk(singlePin.id, boardId)).then(history.push(`/pin/${singlePin.id}`))
            .catch(history.push(`/pin/${singlePin.id}`)
            );
        if (pinId) {
            return history.push(`/pin/${singlePin.id}`)
        }
    }
    console.log("currentUserBoards", singlePin)
    useEffect(() => {
        dispatch(getPinById(id))
        dispatch(getBoardsofCurrentUser()).then(() => setIsLoaded(true))
    }, [dispatch, id, isLoaded,currentUser])


    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(board)
    }

    async function unfollow(username) {
        console.log("username", username)
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


    if (!singlePin && !currentUser && !options.length && isLoaded == false) return <h1>...Loading</h1>

    return (
        <>
        {isLoaded && (
        <div className="single-pin-wrapper">
            <div className="single-pin">
                <div>
                    <img className="single-pin-image" src={singlePin.image} alt={singlePin.alt_text ? singlePin.alt_text : ""} />
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
                            <div>
                                <div>
                                    <p>{singlePin.owner_info?.first_name} {singlePin.owner_info?.last_name}</p>
                                </div>
                                <div>
                                    {formatFollowers(singlePin?.owner_info?.followers.length)}
                                </div>
                            </div>
                        </div>
                        <div>
                            {currentUser && currentUser.id !== singlePin.owner_id && !singlePin.owner_info?.followers.includes(currentUser.username) ? <button>Follow</button> : null}
                            {currentUser && currentUser.id !== singlePin.owner_id && singlePin.owner_info?.followers.includes(currentUser.username) ? <button>Following</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}



// {currentUser.id === singlePin.owner_id ? <button className="single-pin-ellipsis"><i className="fa-solid fa-ellipsis"></i></button> : null}
// <form className="single-pin-edit-board-form" onSubmit={e => handleSubmit(e)}>
//     <label>
//         <select
//             className="single-pin-edit-board-form-select"
//             value={board}
//             onChange={(e) => setBoard(e.target.value)}
//         >
//             {currentUserBoardsArr.map(boardValue => (
//                 <option
//                 className="blue"
//                 value={boardValue.id}>
//                     {boardValue.name}
//                 </option>
//             ))}
//         </select>
//     </label>
//     <button className="single-pin-edit-board-button">Save</button>
// </form>
