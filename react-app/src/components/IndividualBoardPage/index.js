import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBoardByName } from "../../store/boards"
import { useDispatch, useSelector } from "react-redux"

export default function IndividualBoardPage () {
    let { username, boardName } = useParams()
    const [loading,setLoading] = useState(false)
    const [menu, showMenu] = useState(false)
    const dispatch = useDispatch()
    let singleBoard = useSelector(state => state.boards.singleBoard)
    const currentUser = useSelector(state => state.session.user)

    function pinDisplay(pins) { 
        if (pins === 0 || pins > 1) {
            return `${pins} pins`
        } else {
            return "1 pin"
        }
    }

    useEffect(() => {
        dispatch(getBoardByName(username, boardName)).then(setLoading(true))
    }, [dispatch])

    if (!Object.values(singleBoard).length) return <h1>..Loading</h1>
    
    let ellipsisClassName = menu ? "board-ellipsis-wrapper" : "board-ellipsis-wrapper hidden"

    return (
        <div>
            {loading && 
            <div>
                <div>
                    <h1>{singleBoard.name}</h1>
                    {currentUser.id === singleBoard.user.id ? 
                    <div>
                        <i onClick={() => showMenu(!menu)} className="fa-solid fa-ellipsis"></i>
                        <div className={ellipsisClassName}>
                            <p>Board options</p>
                            <p>Edit board</p>
                        </div>
                    </div>
                    : null}
                </div>
                {singleBoard.user.profile_image ? <img src={singleBoard.user.profile_image}/> : <i className="fa-solid fa-circle-user"></i>}
                <div>
                    {pinDisplay(singleBoard.pins.length)}
                </div>
            </div>}
        </div>
    )
}