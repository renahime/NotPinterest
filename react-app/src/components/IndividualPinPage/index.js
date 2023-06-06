import { useDispatch, useSelector } from "react-redux"
import { getPinById } from "../../store/pins"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./IndividualPinPage.css"

export default function IndividualPinPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [board, setBoard] = useState("")
    const singlePin = useSelector(state => state.pins.singlePin)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getPinById(id))
    }, [dispatch, id])

    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    if (!singlePin) return <h1>...Loading</h1>

    return (
        <div className="single-pin-wrapper">
            <div className="single-pin">
                <div>
                    <img className="single-pin-image" src={singlePin.image} alt={singlePin.alt_text ? singlePin.alt_text : ""}/>
                </div>
                <div>
                    <div>
                        <button>
                        <i className="fa-solid fa-ellipsis"></i>
                        </button>
                        <form>
                            <label>
                                <input
                                    type="list"
                                    onChange={(e) => setBoard(e.target.name)}
                                />
                            </label>
                            <button>Save</button>
                        </form>
                    </div>
                    <div> {singlePin.title ? <h2>{singlePin.title}</h2> : null} </div>
                    <div>
                        <div>
                            {singlePin.profile_image ? <img src={singlePin.profile_image} /> : <i className="fa-solid fa-circle-user"></i>}
                        </div>
                        <div>
                            {formatFollowers(singlePin?.owner_info?.followers.length)}
                        </div>
                    </div>
                    <div>
                        {currentUser && currentUser.id !== singlePin.owner_id && !singlePin.owner_info?.followers.includes(currentUser.username) ? <button>Follow</button> : null}
                        {currentUser && currentUser.id !== singlePin.owner_id && singlePin.owner_info?.followers.includes(currentUser.username) ? <button>Following</button> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}