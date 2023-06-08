import { useDispatch, useSelector } from "react-redux"
import { getPinById } from "../../store/pins"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./IndividualPinPage.css"
import { Link } from "react-router-dom"
import { getBoardsofCurrentUser } from "../../store/boards"
import { unfollowUser, followUser } from "../../store/session"

export default function IndividualPinPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [board, setBoard] = useState("")
    const [showDetails, setShowDetails] = useState(false)
    const singlePin = useSelector(state => state.pins.singlePin)
    const currentUser = useSelector(state => state.session.user)
    const currentUserBoards = useSelector(state => state.boards.currentUserBoards)
    const currentUserBoardsArr = Object.values(currentUserBoards)


    console.log("currentUserBoards", singlePin)
    useEffect(() => {
        dispatch(getPinById(id))
        dispatch(getBoardsofCurrentUser())
    }, [dispatch, id])


    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(board)
    }

    async function unfollow(username) {
        console.log("username", username)
        let response = await dispatch(unfollowUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else {
            console.log("i work")
        }
    }

    async function follow(username) {
        console.log("username", username)
        let response = await dispatch(followUser(username))
        if (response.errors) {
            console.log(response.errors)
        } else {
            console.log("i work too")
        }
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
                        <form className="single-pin-edit-board-form" onSubmit={e => handleSubmit(e)}>
                            <label>
                                <select
                                    className="single-pin-edit-board-form-select"
                                    value={board}
                                    onChange={(e) => setBoard(e.target.value)}
                                >
                                    {currentUserBoardsArr.map(boardValue => (
                                        <option
                                        className="blue"
                                        value={boardValue.id}>
                                            {boardValue.name}
                                        </option>
                                    ))}
                                </select>
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
                            {currentUser && currentUser.id !== singlePin.owner_id && !singlePin.owner_info?.followers.includes(currentUser.username) ? <button onClick={() => follow(singlePin.owner_info.username)} className="single-pin-follow-button">Follow</button> : null}
                            {currentUser && currentUser.id !== singlePin.owner_id && singlePin.owner_info?.followers.includes(currentUser.username) ? <button onClick={() => unfollow(singlePin.owner_info.username)}className="single-pin-following-button">Following</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}