import { useDispatch, useSelector } from "react-redux"
import { getPinsByCategory } from "../../store/pins"
import React, { useEffect, useState } from "react"
import { useHistory, NavLink } from "react-router-dom"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { getAllPinsThunkOld } from "../../store/pins"
import { getCurrentUserBoards } from "../../store/boards"
import LoadingButton from "../LoadingButton";
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from "../CreateBoardModal";
import "./casandra-feed.css"


export default function CaSandraFeed({ grabString, setGrabString, setSearching, searching }) {
    const dispatch = useDispatch()
    const history = useHistory()
    let [loading, setLoading] = useState(false)
    let [finishedLoading, setFinished] = useState(false)
    let pins = useSelector(state => state.pins.pins)
    let sessionUser = useSelector(state => state.session.user)
    let currentUserBoards = useSelector(state => state.boards.currentUserBoards)
    const [hoverBoard, setHoverBoard] = useState(false)
    const [hoverBoardDiv, setHoverBoardDiv] = useState("")
    const [found, setFound] = useState(false)
    const [check, setCheck] = useState(true)
    // const [selectedBoardDropdown, setSelectedBoardDropdown] = useState(sessionUser?.boards[0]?.name || "")
    const [currentUser, setCurrentUser] = useState(sessionUser ? true : false)
    let [pinsArr, setPinsArr] = useState([])
    let numberOfPins = 0
    let boards = 0


    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            setSearching(false)
            setGrabString("")
        });
    }, [])
    useEffect(() => {
        if (sessionUser) {
            setCurrentUser(true)
        } else {
            setCurrentUser(false)
        }
    }, [sessionUser])

    useEffect(() => {
        if (grabString) {
            setSearching(true)
        } else {
            setSearching(false)
        }
    }, [searching, grabString])

    function filterPins(pins) {
        if ((!sessionUser || sessionUser.categories.length === 0) && !searching) {
            let randomPins = shufflePins(pins)
            return {
                filteredPinsArr: randomPins.splice(0, 30),
                userPins: null
            }
        } else if (searching) {
            let filteredPins = []
            let userPins = 0
            for (let pin of pins) {
                if (pin.owner_id === sessionUser.id) userPins++
                if (pin.title && pin.title.toLowerCase().includes(grabString.toLowerCase())) {
                    filteredPins.push(pin)
                }
                if (pin.description && pin.description.toLowerCase().includes(grabString.toLowerCase())) {
                    filteredPins.push(pin)
                }
                if (pin.alt_text && pin.alt_text.toLowerCase().includes(grabString.toLowerCase())) {
                    filteredPins.push(pin)
                }
                if (pin.user.username.toLowerCase().includes(grabString.toLowerCase())) {
                    filteredPins.push(pin)
                }
                if (pin.categories.length > 0) {
                    for (let category of pin.categories) {
                        if (category.toLowerCase().includes(grabString.toLowerCase())) {
                            filteredPins.push(pin)
                        }
                    }
                }
            }
            let randomPins = shufflePins(filteredPins)
            if (randomPins.length > 0) {
                setCheck(true)
            } else {
                setCheck(false)
            }
            return {
                filteredPinsArr: randomPins.splice(0, 30),
                userPins: userPins
            }
        }
        else if (!searching) {
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
            return {
                filteredPinsArr: filteredPins.splice(0, 30),
                userPins: userPins
            }
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

    function onHoverBoard(board) {
        setHoverBoard(true)
        setHoverBoardDiv(board.id)
    }
    function offHoverBoard() {
        setHoverBoard(false)
        setHoverBoardDiv("")
    }
    let formatBoards = (n) => {
        if (n === 1) {
            return "1 board"
        } else {
            return `${n} boards`
        }
    }

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllPinsThunkOld()).then(() => dispatch(getCurrentUserBoards())).then(() => setLoading(true))
        } else {
            dispatch(getAllPinsThunkOld()).then(() => setLoading(true))
        }
    }, [dispatch])

    useEffect(() => {
        if (!loading && !pins) {
            return
        }
        if (!pins || !Object.values(pins).length) {
            return
        }
        else {
            if (pins && loading && Object.values(pins).length) {
                const { filteredPinsArr, userPins } = filterPins(Object.values(pins))
                setPinsArr(filteredPinsArr);
                if (sessionUser) {
                    numberOfPins = userPins
                }
            }
            setFinished(true)
            setFound(true)
        }
    }, [loading, pins, grabString])

    if (pins && !Object.values(pins).length) {
        return (
            <LoadingButton
                isLoading={loading}
            />
        )
    }

    let userBoards = Object.values(currentUserBoards)

    return (
        <div>

            {(currentUser && (sessionUser && currentUserBoards)) ? (
                <>
                    <div className="board-container-top-text">
                        <div>Hey {sessionUser.first_name}, you have</div>
                        <NavLink to={`/${sessionUser.username}`}>  {sessionUser && userBoards.length ? (userBoards.length) : 0} </NavLink>
                        <div> boards. </div>
                        {/* <NavLink to={`/${sessionUser.username}`}> {sessionUser && sessionUser.boards.length ? (sessionUser.boards.reduce(
            (total, board) => (board.pins.length ? total + board.pins.length : 0), 0)) : 0}pins</NavLink> */}
                        <div>Check them out!</div>
                    </div>

                    <div className="full-board-container">

                        <div className="board-container" ref={scrollContainerRef}>
                            <div className="scroll-arrows left-arrow" onClick={handleScrollLeft}>
                                <i className="fa-solid fa-angle-left"></i>
                            </div>
                            <div className="scroll-arrows right-arrow" onClick={handleScrollRight}>
                                <i className="fa-solid fa-angle-left fa-rotate-180"></i>
                            </div>

                            {userBoards.map((board, index) => (

                                <div key={board.id} className="board-top" style={boardColors[index % boardColors.length]} onClick={() => viewIndividualBoard(sessionUser.username, board.name)} onMouseEnter={() => onHoverBoard(board)} onMouseLeave={() => offHoverBoard()}>
                                    {/* <OpenModalButton
            buttonText={board.name}
            className="test-open-create-board-modal"
            modalComponent={<UpdateBoardModal id={board.id} />}
            onClick={() => history.push(`/boards/${board.id}`)}
          /> */}
                                    <div>
                                        {board.name}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </>

            ) : ((currentUser && (sessionUser && userBoards.length)) ? (
                <>
                    <div className="board-container-top-text">
                        <div>Oh no, you have</div>
                        <NavLink to={`/${sessionUser.username}`}> {userBoards.length} boards.</NavLink>
                        <div>Let's change that!</div>
                        <OpenModalButton
                            buttonText="Create Board"
                            className="feed-page-create-board"
                            modalComponent={<CreateBoardModal username={sessionUser?.username} />}
                        />
                    </div>
                </>
            ) : (null)
            )
            }
            < div className="pins-feed-wrapper-wrapper">
                {pinsArr.length > 0 ? <ResponsiveMasonry className="pins-feed-wrapper" options={{ fitWidth: true }}
                    columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5, 1900: 6 }}>
                    <Masonry gutter="10px" className="feed-pin-masonry" options={{ fitWidth: true }}>
                        {pinsArr.map(pin => (
                            <div
                                // onHover={() =>}
                                className="feed-individual-pin-wrapper">
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
                </ResponsiveMasonry> : check ? <LoadingButton isLoading={found}></LoadingButton> : <h1>couldn't find pins sowwi :c</h1>}
            </div>
        </div >
    )
}
