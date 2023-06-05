import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getBoardsByUsername } from "../../store/boards"

export default function UserBoards() {
    const dispatch = useDispatch()
    const { username } = useParams()
    let userBoards = useSelector(state => state.boards.currentProfileBoards)
    console.log("userboards", userBoards)

    useEffect(() => {
        dispatch(getBoardsByUsername(username))
    }, [dispatch])
    return (
        <h1>hello</h1>
    )
}