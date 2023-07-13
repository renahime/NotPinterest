import { useEffect, useState } from "react"
import { getSingleBoardThunk, clearBoard } from "../../store/boards"
import { getPinsForBoard, clearBoardPins } from "../../store/pins"
import { useDispatch, useSelector } from "react-redux"
import PinsForBoardPage from "./PinsForBoardPage"
import { Link, useHistory, useLocation } from "react-router-dom"
import UpdateBoardModal from "../UpdateBoardModal"
import { useModal } from "../../context/Modal"
import './IndividualBoardPage.css'

export default function IndividualBoardPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory()
    let [ownerCheck, setOwnerCheck] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    let [loading, setLoading] = useState(false);
    const [menu, showMenu] = useState(false)
    const { setModalContent, closeModal } = useModal();
    const [currentBoard, setCurrentBoard] = useState({})
    let usernameBoardName = location.pathname.split('/')
    let username = usernameBoardName[1]
    let boardName = usernameBoardName[2]
    const currentUser = useSelector(state => state.session.user)
    const currentUserBoard = useSelector(state => state.boards.currentUserBoards)
    const currentBoardPins = useSelector(state => state.pins.currentBoardPins)
    let boardPins = []
    const individualBoard = useSelector(state => state.boards.singleBoard)


    console.log("USERNAME", username)
    console.log("CURRENT BOARRD", currentBoard)

    useEffect(() => {
        if (currentUser && Object.values(currentUserBoard).length) {
            if (username === currentUser.username) {
                setOwnerCheck(true);
                for (let board of Object.values(currentUserBoard)) {
                    let name = boardName.split("_").join(" ")
                    if (board.name.toLowerCase() === name.toLowerCase()) {
                        setCurrentBoard(board)
                    }
                }
            } else {
                dispatch(getSingleBoardThunk(username, boardName)).then((board) => dispatch(getPinsForBoard(board.id)))
            }
        }
        return (() => {
            if (!Object.values(currentBoard).length) {
                dispatch(clearBoard())
                dispatch(clearBoardPins())
            } else {
                setCurrentBoard({})
            }
        })
    }, [dispatch, currentUserBoard, boardName])


    // If we click off of the Create tab, the modal will dissapear
    useEffect(() => {
        const handleClick = (event) => {
            if (menu === true) {
                showMenu(false)
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [menu]);

    console.log("TESTING ID", individualBoard.id)
    console.log("INDIVUDAL BOARD", individualBoard)

    const openUpdateModal = (event) => {
        event.preventDefault();
        const modalContent = (
            <div>
                <UpdateBoardModal id={currentBoard.id} username={username} board={currentBoard} boardPage={true}/>
            </div>
        );
        setModalContent(modalContent);
    };

    let ellipsisInfoClassName = menu ? "board-ellipsis-wrapper" : "board-ellipsis-wrapper hidden"
    const handleBack = () => {
        history.goBack()
    }
    if (Object.values(individualBoard).length) {
        boardPins = Object.values(individualBoard.pinInfo);
    }


    return (
        <div >
            {!Object.values(individualBoard).length && !ownerCheck ? <h1>Loading..</h1> :
                <div className="individual-board-wrapper">
                    {/* <i onClick={handleBack} class="fa-solid fa-arrow-left cursor-pointer"></i> */}
                    <div className="individual-board-info-wrapper">
                        {ownerCheck ?
                            <div className="individual-board-info">
                                <div className="individual-board-info-owner">
                                    <h1>{currentBoard.name}</h1>
                                    <button onClick={() => showMenu(!menu)} className="individual-board-ellipsis">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <div className={ellipsisInfoClassName}>
                                        {/* <p>Board options</p> */}
                                        <p onClick={(event) => openUpdateModal(event)} >Edit board</p>
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
                        {ownerCheck ?
                            <PinsForBoardPage currentBoard={currentBoard} ownerCheck={ownerCheck} pins={currentBoard.pins ? Object.values(currentBoard.pins) : ""} />
                            :
                            <PinsForBoardPage ownerCheck={ownerCheck} pins={boardPins} />
                        }
                    </div>
                </div>}
        </div>
    )
}
