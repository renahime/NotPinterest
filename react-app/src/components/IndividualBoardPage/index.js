import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBoardByName } from "../../store/boards"
import { useDispatch, useSelector } from "react-redux"
import PinsForBoardPage from "./PinsForBoardPage"
import './IndividualBoardPage.css'
import { Link } from "react-router-dom"

export default function IndividualBoardPage() {
    let { username, boardName } = useParams()
    const [loading, setLoading] = useState(false)
    const [menu, showMenu] = useState(false)
    const dispatch = useDispatch()
    let singleBoard = useSelector(state => state.boards.singleBoard)
    const currentUser = useSelector(state => state.session.user)

    console.log("SINGLE BOARD:", singleBoard)

    function pinDisplay(pins) {
        if (pins === 0 || pins > 1) {
            return `${pins} pins`
        } else {
            return "1 pin"
        }
    }

    useEffect(() => {
        dispatch(getBoardByName(username, boardName)).then(setLoading(true)).catch((e) => console.log("e", e))
    }, [dispatch])

    if (!Object.values(singleBoard).length) return <h1>..Loading</h1>

    let ellipsisInfoClassName = menu ? "board-ellipsis-wrapper" : "board-ellipsis-wrapper hidden"

    return (
        <div >
            {loading &&
                <div className="individual-board-wrapper">
                    <div className="individual-board-info-wrapper">
                        {currentUser.id === singleBoard.user.id ?
                            <div className="individual-board-info">
                                <div className="individual-board-info-owner">
                                    <h1>{singleBoard.name}</h1>
                                    <button onClick={() => showMenu(!menu)} className="individual-board-ellipsis">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <div className={ellipsisInfoClassName}>
                                        <p>Board options</p>
                                        <p>Edit board</p>
                                    </div>
                                </div>
                                {singleBoard.user.profile_image ? <img className="individual-board-profile-image" src={singleBoard.user.profile_image} /> : <i className="fa-solid fa-circle-user individual-board-profile-image"></i>}
                                <div>
                                    <div className="individual-board-description-owner">{singleBoard.description ? singleBoard.description : null}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="individual-board-info">
                                <h1>{singleBoard.name}</h1>
                                {singleBoard.user.profile_image ? <img className="individual-board-profile-image" src={singleBoard.user.profile_image} /> : <i className="fa-solid fa-circle-user individual-board-profile-image"></i>}
                                <div className="individual-board-description">
                                    <Link className="individual-board-profile-link" to={`/${singleBoard.user.username}`}>{singleBoard.user.username}</Link>
                                    <i className="fa-solid fa-circle board-dot"></i>
                                    <div>{singleBoard.description ?
                                        <div>
                                            {singleBoard.description}</div> : null}
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <PinsForBoardPage pins={singleBoard["pinInfo"]} />

                </div>}
        </div>
    )
}
