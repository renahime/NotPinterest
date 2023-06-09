import { useDispatch, useSelector } from "react-redux"
import { getPinsByCategory } from "../../store/pins"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export default function CaSandraFeed() {
    const dispatch = useDispatch()
    const history = useHistory()
    let [loading, setLoading] = useState(false)
    let [finishedLoading, setFinished] = useState(false)
    let pins = useSelector(state => state.pins.pins)
    let pinsArr = []
    if (pins && Object.values(pins) != null) {
        pinsArr = shufflePins(Object.values(pins))
    }

    function shufflePins(pins) {
        let newPinOrder = []
        let copy = [...pins]
        while (copy.length) {
            let i = Math.floor(Math.random() * copy.length)
            newPinOrder.push(copy[i])
            copy.splice(i, 1)
        }
        return newPinOrder
    }

    useEffect(() => {
        dispatch(getPinsByCategory()).then(() => setLoading(true))
    }, [dispatch])

    useEffect(() => {
        if (!loading && !pins[0] && !pins[0]?.id) {
            return
        }
        if (!Object.values(pins).length) {
            return
        }
        else {
            setTimeout(() => {
                console.log("Inside the set time out", pins)
                setFinished(true)
            }, 1000)
        }
    }, [loading, pins])

    if (!pinsArr[0]?.id || !finishedLoading) return <h1>...Loading</h1>
    console.log(pinsArr)
    return (
        <div className="pins-feed-wrapper">
            {pinsArr.map(pin => (
                <div>
                    <div onClick={() => history.push(`/pin/${pin.id}`)}>
                        <img src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
                        <div>
                            {pin.title ? <p className="individual-board-pin-title">{pin.title}</p> : null}
                        </div>
                    </div>
                    <div className="individual-board-pin-owner-info" onClick={() => history.push(`/${pin.user.username}`)}>
                        {pin.user.profile_image ? <img src={pin.user.profile_image} /> : null}
                        {pin.user.username}
                    </div>
                </div>
            ))}
        </div>
    )
}