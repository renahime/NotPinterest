import { useDispatch, useSelector } from "react-redux"
import { getPinsByCategory } from "../../store/pins"
import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { getAllPinsThunkOld } from "../../store/pins"
import LoadingButton from "../LoadingButton";
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from "../CreateBoardModal";
import "./casandra-feed.css"


export default function CaSandraFeed() {
    const dispatch = useDispatch()
    const history = useHistory()
    let [loading, setLoading] = useState(false)
    let [finishedLoading, setFinished] = useState(false)
    let pins = useSelector(state => state.pins.allPins)
    let sessionUser = useSelector(state => state.session.user)
    const [hoverBoardDiv, setHoverBoardDiv] = useState("")
    const [selectedBoardDropdown, setSelectedBoardDropdown] = useState(sessionUser.boards[0]?.name || "")

    let pinsArr = []
    let numberOfPins = 0
    let boards = 0
    if (pins && Object.values(pins) != null) {
        [pinsArr, numberOfPins] = filterPins(Object.values(pins))
        if (sessionUser) {
            boards = sessionUser.boards.length
        }
    }

    function filterPins(pins) {
        if (!sessionUser || sessionUser.categories.length === 0) {
            let randomPins = shufflePins(pins)
            return randomPins.splice(0, 30)
        } else {
            let filteredPins = []
            let userPins = 0
            let categories = sessionUser.categories
            for (let pin of pins) {
                if (pin.owner_id === sessionUser.id) userPins++
                for (let category of categories) {
                    if (pin.categories.includes(category))
                        filteredPins.push(pin)
                }
            }
            let randomPins = shufflePins(filteredPins)
            return [randomPins.splice(0, 30), userPins]
        }
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

    function viewIndividualBoard(username, name) {
        let nameArr = name.toLowerCase().split(" ")
        let formattedName = nameArr.join("_")
        history.push(`/${username}/${formattedName}`)
    }

    const [boardColors] = useState([
        { backgroundColor: "rgb(233, 212, 212)" },
        { backgroundColor: "rgb(190, 205, 193)" },
        { backgroundColor: "rgb(229, 235, 209)" },
        { backgroundColor: "rgb(244, 230, 219)" },

    ]);

    const scrollContainerRef = React.useRef(null);

    const handleScrollLeft = () => {
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.scrollTo({
            left: scrollContainer.scrollLeft - 200,
            behavior: 'smooth' // You can remove this line if you prefer an instant scroll
        });
    };

    const handleScrollRight = () => {
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.scrollTo({
            left: scrollContainer.scrollLeft + 200,
            behavior: 'smooth' // You can remove this line if you prefer an instant scroll
        });
    };

    let formatBoards = (n) => {
        if (n === 1) {
            return "1 board"
        } else {
            return `${n} boards`
        }
    }

    useEffect(() => {
        dispatch(getAllPinsThunkOld()).then(() => setLoading(true))
    }, [dispatch])

    useEffect(() => {
        if (!loading && !pins) {
            return
        }
        if (!pins || !Object.values(pins).length) {
            return
        }
        else {
            setTimeout(() => {
                setFinished(true)
            }, 1000)
        }
    }, [loading, pins])

    if (!pinsArr[0]?.id || !finishedLoading) {
        return (
            <LoadingButton
                isLoading={loading}
            // disabled={isLoading}
            />
        )
    }

    return (
        <div>
            {Object.values(sessionUser).length === 0 ?
                <h3>Sign up for Threadterest today and make some new threads!</h3> :
                boards > 0 ?
                    <div>
                        <div>
                            <div className="board-container-top-text">
                                <h3>
                                    Hey {sessionUser.first_name}, you have <span><Link to={`/${sessionUser.username}`}> {formatBoards(boards)}</Link> </span> and <span><Link to={`/${sessionUser.username}/_created`}> {numberOfPins} pins.</Link></span
                                    > Check them out!
                                </h3>
                            </div>
                        </div>
                        <div className="full-board-container">
                            <div className="board-container" ref={scrollContainerRef}>
                                <div className="scroll-arrows left-arrow" onClick={handleScrollLeft}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </div>
                                <div className="scroll-arrows right-arrow" onClick={handleScrollRight}>
                                    <i className="fa-solid fa-angle-left fa-rotate-180"></i>
                                </div>
                                {sessionUser.boards.map((board, index) => (
                                    <div key={board.id} className="board-top" style={boardColors[index % boardColors.length]} onClick={() => viewIndividualBoard(sessionUser.username, board.name)}
                                    >
                                        <div>
                                            {board.name}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div>
                            <label htmlFor="boardSelect">Select a board:</label>
                            <select id="boardSelect" onChange={(e) => setSelectedBoardDropdown(e.target.value)} value={selectedBoardDropdown}>
                                {sessionUser.boards.map((board) => (
                                    <option key={board.id} value={board.name}>
                                        {board.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    :
                    <div className="board-container-top-text">
                        <h3>
                            Oh no, you have <span><Link to={`/${sessionUser.username}`}> {boards.length} boards.</Link></span> Let's change that!
                            <OpenModalButton
                                buttonText="Create Board"
                                className="feed-page-create-board"
                                modalComponent={<CreateBoardModal username={sessionUser?.username} />}
                            />
                        </h3>
                    </div>
                    }
            < div className="pins-feed-wrapper-wrapper">
                <ResponsiveMasonry className="pins-feed-wrapper" options={{ fitWidth: true }}
                    columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5, 1900: 6 }}>
                    <Masonry className="feed-pin-masonry" options={{ fitWidth: true }}>
                        {pinsArr.map(pin => (
                            <div className="feed-individual-pin-wrapper">
                                <div onClick={() => history.push(`/pin/${pin.id}`)}>
                                    <img className="feed-pin-image" src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
                                </div>
                                <div className="feed-individual-pin-info" onClick={() => history.push(`/${pin.user.username}`)}>
                                    <div>
                                        {pin.title ? <p className="feed-pin-title">{pin.title}</p> : null}
                                    </div>
                                    <div className="feed-individual-pin-user-info">
                                        {pin.user.profile_image ? <img className="feed-profile-image" src={pin.user.profile_image} /> : null}
                                        <p>{pin.user.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div >
    )
}
