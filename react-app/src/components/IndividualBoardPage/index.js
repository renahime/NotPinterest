import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { authenticate } from "../../store/session";
import { getBoardByName, getSingleBoardThunk, clearBoard, getCurrentUserBoards } from "../../store/boards"
import { getPinsForBoard, clearBoardPins } from "../../store/pins"
import { useDispatch, useSelector } from "react-redux"
import PinsForBoardPage from "./PinsForBoardPage"
import './IndividualBoardPage.css'
import { Link, useHistory, useLocation } from "react-router-dom"

export default function IndividualBoardPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory()
    let [ownerCheck, setOwnerCheck] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    let [loading, setLoading] = useState(false);
    const [menu, showMenu] = useState(false)
    const [currentBoard, setCurrentBoard] = useState({})
    const [currentBoardPinsUser, setCurrentBoardPinsUser] = useState({})
    let usernameBoardName = location.pathname.split('/')
    let username = usernameBoardName[1]
    let boardName = usernameBoardName[2]
    const currentUser = useSelector(state => state.session.user)
    const currentUserBoard = useSelector(state => state.boards.currentUserBoards)
    const currentBoardPins = useSelector(state => state.pins.currentBoardPins)
    let boardPins = []
    const individualBoard = useSelector(state => state.boards.singleBoard)
    // let boardPins

    // useEffect(() => {
    //     dispatch(authenticate()).then((data) => {
    //         if (data && data["message"]) {
    //             dispatch(getCurrentUserBoards())
    //         }
    //     }).then(() => setIsLoaded(true));
    // }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            if (username === currentUser.username) {
                setOwnerCheck(true);
                for (let board of Object.values(currentUserBoard)) {
                    let name = boardName.split("_").join(" ")
                    if (board.name === name) {
                        setCurrentBoard(board)
                        // setLoading(true)
                        // setCurrentBoardPinsUser(board.pins)
                        // boardPins = Object.values(currentBoard.pins)
                        console.log("pins", board.pins)
                    }
                }
            } else {
                dispatch(getSingleBoardThunk(username, boardName)).then((board) => dispatch(getPinsForBoard(board.id)))
                // setLoading(true)
            }
        }
        return (() => {
            // setLoading(false)
            if (!Object.values(currentBoard).length) {
                dispatch(clearBoard())
                dispatch(clearBoardPins())
            } else {
                setCurrentBoard({})
            }
        })
    }, [dispatch])

    useEffect(() => {
        if (currentUser) {
            if (currentBoard) {
                setCurrentBoardPinsUser(currentBoard.pins)
            }
        }
    }, [currentUser, currentBoard])

    let ellipsisInfoClassName = menu ? "board-ellipsis-wrapper" : "board-ellipsis-wrapper hidden"
    const handleBack = () => {
        history.goBack()
    }
    if (Object.values(individualBoard).length) {
        boardPins = Object.values(individualBoard.pinInfo);
    }

    console.log("currentBoardPinsUser", currentBoardPinsUser)

    // if (!loading) return <h1>Loading</h1>
    return (
        <div >
            {!Object.values(individualBoard).length && !ownerCheck ? <h1>Loading..</h1> :
                <div className="individual-board-wrapper">
                    <i onClick={handleBack} class="fa-solid fa-arrow-left"></i>
                    <div className="individual-board-info-wrapper">
                        {ownerCheck ?
                            <div className="individual-board-info">
                                <div className="individual-board-info-owner">
                                    <h1>{currentBoard.name}</h1>
                                    <button onClick={() => showMenu(!menu)} className="individual-board-ellipsis">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <div className={ellipsisInfoClassName}>
                                        <p>Board options</p>
                                        <p>Edit board</p>
                                    </div>
                                </div>
                                {currentUser.profile_image ? <img className="individual-board-profile-image" src={currentUser.profile_image} /> : <i className="fa-solid fa-circle-user individual-board-profile-image"></i>}
                                <div>
                                    <div className="individual-board-description-owner">{currentBoard.description ? currentBoard.description : null}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="individual-board-info">
                                <h1>{individualBoard.name}</h1>
                                {individualBoard.user.profile_image ? <img className="individual-board-profile-image" src={individualBoard.user.profile_image} /> : <i className="fa-solid fa-circle-user individual-board-profile-image"></i>}
                                <div className="individual-board-description">
                                    <div>{individualBoard.description ?
                                        <div>
                                            {individualBoard.description}</div> : null}
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className="pins-for-board-page-wrapper">
                        {/* <PinsForBoardPage currentBoard={ownerCheck ? currentBoard : ""} ownerCheck={ownerCheck} pins={ownerCheck && Object.values(currentBoard).length ? Object.values(currentBoardPinsUser) : boardPins} /> */}
                    </div>
                </div>}
        </div>
    )
}
