import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, clearProfile } from "../../../store/profile"
import { getBoardsByUsername } from "../../../store/boards"
import CurrentUserBoard from "../UserBoards/CurrentUserBoard"
import NotUSerProfile from "../UserBoards/NotUserProfile"
import PageNotFound from "../../PageNotFound"

export default function UserPins({request}) {
    const history = useHistory()
    // console.log("request", request)
    const { username } = useParams()
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [foundUser, setFoundUser] = useState(false)
    const currentProfile = useSelector(state => state.profile.currentProfile)
    const currentUser = useSelector(state => state.session.user)
    let userBoards = useSelector(state => state.boards.currentProfileBoards)
    let userBoardsArr = Object.values(userBoards)

    let showMenu = () => {
        setOpenMenu(!openMenu)
    }

    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    let checkUser = () => {
        if (currentUser.username === currentProfile.username) return true
        else return false
    }

    useEffect(() => {
        setTimeout(async () => {
            await dispatch(getUserInfo(username)).then(() => setLoading(true))
        }, 1000)
        return (() => dispatch(clearProfile()))
    }, [dispatch])

    useEffect(() => {
        if (!loading) return
        if (!Object.values(currentProfile).length) return
        else dispatch(getBoardsByUsername(username))
    }, [loading, currentProfile])

    let menuClassName = openMenu ? "profile-menu" : "hidden profile-menu"

    if (!loading) return <h1>Loading...</h1>
    else if (!currentProfile.id) return <PageNotFound />
    return (
        <div>
            Hello
        </div>
    )
}