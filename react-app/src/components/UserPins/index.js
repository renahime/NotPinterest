import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import PageNotFound from "../PageNotFound"
import "../ProfilePage/ProfilePage.css"

export default function UserPins({ pins }) {
    const history = useHistory()
    const currentProfile = useSelector(state => state.profile.currentProfile)
    let userPinsArr = pins

    if (!currentProfile.id) return <PageNotFound />
    return (
        <div>
            <div className="individual-board-pins-wrapper">
                {userPinsArr.length ?
                    userPinsArr.map(pin => (
                        <div className="individual-board-individual-pins-wrapper">
                            <div className="individual-boards-link-to-pin" onClick={() => history.push(`/pin/${pin.id}`)}>
                                <img className="individual-board-pin-image" src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
                                <div>
                                    {pin.title ? <p className="individual-board-pin-title">{pin.title}</p> : null}
                                </div>
                            </div>
                        </div>
                    ))
                    : <h2>Share your threads with us today!</h2>
                }
            </div>
        </div>
    )
}
