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
                    <img className="single-pin-image" src={singlePin.image} alt={singlePin.alt_text ? singlePin.alt_text : ""} />
                </div>
                <div className="single-pin-details">
                    <div className="single-pin-edit-board">
                        {currentUser.id === singlePin.owner_id ? <button className="single-pin-ellipsis"><i className="fa-solid fa-ellipsis"></i></button> : null}

                        <form className="single-pin-edit-board-form">
                            <label>
                                <input
                                    type="list"
                                    onChange={(e) => setBoard(e.target.name)}
                                />
                            </label>
                            <button className="single-pin-edit-board-button">Save</button>
                        </form>
                    </div>
                    <div> {singlePin.title ? <h2 className="single-pin-title">{singlePin.title}</h2> : null} </div>
                    <div className="single-pin-owner-info">
                        <div>
                            <div>
                                {singlePin.profile_image ? <img className="single-pin-profile-image" src={singlePin.profile_image} /> : <i className=" single-pin-profile-default fa-solid fa-circle-user"></i>}
                            </div>
                            <div>
                                <div>
                                    <p>{singlePin.owner_info?.first_name} {singlePin.owner_info?.last_name}</p>
                                </div>
                                <div>
                                    {formatFollowers(singlePin?.owner_info?.followers.length)}
                                </div>
                            </div>
                        </div>
                        <div>
                            {currentUser && currentUser.id !== singlePin.owner_id && !singlePin.owner_info?.followers.includes(currentUser.username) ? <button>Follow</button> : null}
                            {currentUser && currentUser.id !== singlePin.owner_id && singlePin.owner_info?.followers.includes(currentUser.username) ? <button>Following</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}