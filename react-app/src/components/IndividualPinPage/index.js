import { useDispatch, useSelector } from "react-redux"
import { getPinById } from "../../store/pins"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./IndividualPinPage.css"
import { Link } from "react-router-dom"
import { getBoardsofCurrentUser } from "../../store/boards"

export default function IndividualPinPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [board, setBoard] = useState("")
    const [showDetails, setShowDetails] = useState(false)
    const singlePin = useSelector(state => state.pins.singlePin)
    const currentUser = useSelector(state => state.session.user)
    const currentUserBoards = useSelector(state => state.boards.currentUserBoards)

    // Select a Color
    //     <select
    //     value={color}
    //     onChange={(e) => setColor(e.target.value)}
    //     >
    //       {COLORS.map(color => (
    //         <option
    //           key={color}
    //         >
    //           {color}
    //         </option>
    //       ))}
    //     </select>
    useEffect(() => {
        dispatch(getPinById(id))
        dispatch(getBoardsofCurrentUser())
    }, [dispatch, id])

    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    if (!singlePin) return <h1>...Loading</h1>

    let singlePinImageClassName = showDetails ? "single-pin-image-button" : "single-pin-image-button hidden"

    return (
        <div className="single-pin-wrapper">
            <div className="single-pin">
                <div className="single-pin-image-wrapper" onMouseEnter={() => setShowDetails(!showDetails)} onMouseLeave={() => setShowDetails(!showDetails)}>
                    <img className="single-pin-image" src={singlePin.image} alt={singlePin.alt_text ? singlePin.alt_text : ""} />
                    {singlePin.destination ? 
                    <a target="_blank" href={singlePin.destination}>
                        <button className={singlePinImageClassName}>
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            {singlePin.destination}
                        </button>
                    </a> 
                    : 
                    <a target="_blank" href={singlePin.image}>
                        <button className={singlePinImageClassName}>
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            View image
                        </button>
                    </a>
                    }
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
                        <div className="single-pin-profile-info">
                            <div>
                                {singlePin.profile_image ? <img className="single-pin-profile-image" src={singlePin.profile_image} /> : <i className=" single-pin-profile-default fa-solid fa-circle-user"></i>}
                            </div>
                            <div className="single-pin-owner-name-followers">
                                    <Link className="single-pin-owner-link" to={`/${singlePin.owner_info?.username}`}>{singlePin.owner_info?.first_name} {singlePin.owner_info?.last_name}</Link>
                                    <p>{formatFollowers(singlePin?.owner_info?.followers.length)}</p>
                            </div>
                        </div>
                        <div>
                            {currentUser && currentUser.id !== singlePin.owner_id && !singlePin.owner_info?.followers.includes(currentUser.username) ? <button className="single-pin-follow-button">Follow</button> : null}
                            {currentUser && currentUser.id !== singlePin.owner_id && singlePin.owner_info?.followers.includes(currentUser.username) ? <button className="single-pin-following-button">Following</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}