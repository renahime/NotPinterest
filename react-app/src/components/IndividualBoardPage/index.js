import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBoardByName, getSingleBoardThunk } from "../../store/boards"
import { useDispatch, useSelector } from "react-redux"
import PinsForBoardPage from "./PinsForBoardPage"
import './IndividualBoardPage.css'
import { Link, useHistory, useLocation } from "react-router-dom"

export default function IndividualBoardPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory()
    let [ownerCheck, setOwnerCheck] = useState(false);
    const [menu, showMenu] = useState(false)
    let usernameBoardName = location.pathname.split('/')
    let username = usernameBoardName[1]
    let boardName = usernameBoardName[2]
    console.log(boardName)
    const currentUser = useSelector(state => state.session.user)
    let boardPins = []
    const individualBoard = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getSingleBoardThunk(username, boardName))
        console.log(currentUser.boards)
        if (currentUser) {
            for (let board of currentUser.boards) {
                if (board && board.id === individualBoard.id) {
                    setOwnerCheck(true);
                }
            }
        }
    }, [dispatch, individualBoard])

    let ellipsisInfoClassName = menu ? "board-ellipsis-wrapper" : "board-ellipsis-wrapper hidden"
    const handleBack = () => {
        history.goBack()
    }

    if (individualBoard.pins) {
        boardPins = Object.values(individualBoard.pinInfo);
    }

    console.log("check", individualBoard);

    return (
        <div >
            {!Object.values(individualBoard).length ? <h1>Loading..</h1> :
                <div className="individual-board-wrapper">
                    <i onClick={handleBack} class="fa-solid fa-arrow-left"></i>
                    <div className="individual-board-info-wrapper">
                        {ownerCheck ?
                            <div className="individual-board-info">
                                <div className="individual-board-info-owner">
                                    <h1>{individualBoard.name}</h1>
                                    <button onClick={() => showMenu(!menu)} className="individual-board-ellipsis">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <div className={ellipsisInfoClassName}>
                                        <p>Board options</p>
                                        <p>Edit board</p>
                                    </div>
                                </div>
                                {individualBoard.user.profile_image ? <img className="individual-board-profile-image" src={individualBoard.user.profile_image} /> : <i className="fa-solid fa-circle-user individual-board-profile-image"></i>}
                                <div>
                                    <div className="individual-board-description-owner">{individualBoard.description ? individualBoard.description : null}
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
                        <PinsForBoardPage pins={boardPins} />
                    </div>
                </div>}
        </div>
    )
}
