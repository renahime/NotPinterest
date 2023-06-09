import { useHistory } from "react-router-dom"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useModal } from "../../context/Modal"
import EditBoardPinsModal from "./EditBoardPinsModal"

export default function PinsForBoardPage({ pins, ownerCheck, currentBoard }) {
    const history = useHistory()
    const { setModalContent } = useModal()
    let pinsArr = Object.values(pins)

    let pinImageClick = (e, pin) => {
        e.stopPropagation()
        setModalContent(<EditBoardPinsModal pin={pin} currentBoard={currentBoard} />)
    }

    return (
        <div className="individual-board-pins-wrapper">
            <ResponsiveMasonry className="board-pins-wrapper"
                columnsCountBreakPoints={{ 350: 2, 830: 3, 1100: 4, 1350: 5, 1900: 6 }}>
                <Masonry gutter="10px" className="board-pin-masonry" options={{ fitWidth: true }}>
                    {pinsArr.map(pin => (
                        <div className="individual-board-individual-pins-wrapper">
                            <div className="individual-boards-link-to-pin" onClick={() => history.push(`/pin/${pin.id}`)}>
                                <img className="individual-board-pin-image" src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
                                {ownerCheck &&
                                    <button className="individual-board-edit-pin-button" onClick={(e) => pinImageClick(e, pin)}>
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>}
                            </div>
                            <div onClick={() => history.push(`/pin/${pin.id}`)}>
                                {pin.title ? <p className="individual-board-pin-title">{pin.title}</p> : null}
                            </div>
                            <div className="individual-board-pin-owner-info" onClick={() => history.push(`/${pin.user.username}`)}>
                                {pin.user?.profile_image ? <img className="individual-board-individual-pin-profile-image" src={pin.user?.profile_image} /> : null}
                                {pin.user?.username}
                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
