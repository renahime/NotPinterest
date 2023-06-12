import { useHistory } from "react-router-dom"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function PinsForBoardPage({ pins }) {
    const history = useHistory()
    let pinsArr = Object.values(pins)
    return (
        <div className="individual-board-pins-wrapper">
            <ResponsiveMasonry className="board-pins-wrapper" 
                columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5, 1900: 6 }}>
                <Masonry className="board-pin-masonry" options={{ fitWidth: true }}>
                    {pinsArr.map(pin => (
                        <div className="individual-board-individual-pins-wrapper">
                            <div className="individual-boards-link-to-pin" onClick={() => history.push(`/pin/${pin.id}`)}>
                                <img className="individual-board-pin-image" src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
                                <div>
                                    {pin.title ? <p className="individual-board-pin-title">{pin.title}</p> : null}
                                </div>
                            </div>
                            <div className="individual-board-pin-owner-info" onClick={() => history.push(`/${pin.owner_info.username}`)}>
                                {pin.owner_info?.profile_image ? <img className="individual-board-individual-pin-profile-image" src={pin.owner_info?.profile_image} /> : null}
                                {pin.owner_info?.username}
                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
