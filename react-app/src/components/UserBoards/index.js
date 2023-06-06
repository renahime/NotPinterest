import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getBoardsByUsername } from "../../store/boards"

export default function UserBoards() {
    const dispatch = useDispatch()
    const { username } = useParams()
    let userBoards = useSelector(state => state.boards.currentProfileBoards)
    let userBoardsArr = Object.values(userBoards)
    console.log("userboards", userBoards)

    useEffect(() => {
        dispatch(getBoardsByUsername(username))
    }, [dispatch])
    return (
        <div></div>
    )
}