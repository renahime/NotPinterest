import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBoardByName } from "../../store/boards"
import { useDispatch, useSelector } from "react-redux"
import PinsForBoardPage from "./PinsForBoardPage"
import './IndividualBoardPage.css'
import { Link, useHistory, useLocation } from "react-router-dom"
import { getSingleBoardThunk } from "../../store/boards";

export default function IndividualBoardPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state;
    const history = useHistory()
    const [menu, showMenu] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    let [ownerCheck, setOwnerCheck] = useState(false);
    let boardPins = []
    const individualBoard = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getSingleBoardThunk(data.id))
        for (let board of currentUser.boards) {
            if (board.id === data.id) {
                setOwnerCheck(true);
            }
        }
    }, [dispatch])

    let ellipsisInfoClassName = menu ? "board-ellipsis-wrapper" : "board-ellipsis-wrapper hidden"
    const handleBack = () => {
        history.goBack()
    }

    if (individualBoard.pins) {
        boardPins = Object.values(individualBoard.pins);
    }

    return (
        <div >
            {boardPins.length === 0 ? <h1>Loading..</h1> :
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
                                    <div className="individual-board-description-owner">{data.description ? data.description : null}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="individual-board-info">
                                <h1>{individualBoard.name}</h1>
                                {individualBoard.user.profile_image ? <img className="individual-board-profile-image" src={individualBoard.user.profile_image} /> : <i className="fa-solid fa-circle-user individual-board-profile-image"></i>}
                                <div className="individual-board-description">
                                    <div>{data.description ?
                                        <div>
                                            {data.description}</div> : null}
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div>
                        <PinsForBoardPage pins={boardPins} />
                    </div>
                </div>}
        </div>
    )
}
