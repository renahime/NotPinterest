import { useDispatch, useSelector } from "react-redux"
import { getPinsByCategory } from "../../store/pins"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export default function CaSandraFeed() {
    const dispatch = useDispatch()
    const history = useHistory()
    let [loading, setLoading] = useState(false)
    let [finishedLoading, setFinished] = useState(false)
    let pins = useSelector(state => state.pins.pins ? state.pins.pins : null)
    let pinsArr = []
    if (pins && Object.values(pins) != null) {
        pinsArr = shufflePins(Object.values(pins))
    }

    function shufflePins(pins) {
        let newPinOrder = []
        // let currentIndices = Set()
        let copy = [...pins]
        while (copy.length) {
            let i = Math.random(copy.length)
            newPinOrder.push(copy[i])
            copy.splice(i, 1)
        }
        return newPinOrder
    }

    useEffect(() => {
        dispatch(getPinsByCategory()).then(() => setFinished(true))
    }, [dispatch])

    useEffect(() => {
        console.log("useEffect second finished loading", finishedLoading)
        console.log("useEffect second pins", pins)
        console.log("useEffect second loading", loading)
        if (!finishedLoading) {
            return
        }
        if (Object.values(pins).length) {
            setLoading(true)
        }
    }, [finishedLoading])

    if (!pins || !pinsArr.length || !loading) return <h1>...Loading</h1>

    return (
        // <h1>Hello</h1>
        <div className="pins-feed-wrapper">
            {pinsArr.map(pin => (
                <h1>{pin.id}</h1>
                // <div>
                //     <div onClick={() => history.push(`/pin/${pin.id}`)}>
                //         <img src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
                //         <div>
                //             {pin.title ? <p className="individual-board-pin-title">{pin.title}</p> : null}
                //         </div>
                //     </div>
                    /* <div className="individual-board-pin-owner-info" onClick={() => history.push(`/${pin.owner_info.username}`)}>
                        {pin.owner_info.profile_image ? <img className="individual-board-individual-pin-profile-image" src={pin.owner_info.profile_image} /> : null}
                        {pin.owner_info.username}
                    </div> */
                // </div>
            ))}
        </div>
    )
}