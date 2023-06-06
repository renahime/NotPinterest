const GET_BOARDS_OF_USER = "boards/getUserBoards"

const getUserBoards = (boards) => ({
    type: GET_BOARDS_OF_USER,
    boards : boards["User Boards"]
})

export const getBoardsByUsername = (username) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}`)
    console.log("res", res)
    if (res.ok) {
        console.log("made it into res.ok")
        let boards = await res.json()
        dispatch(getUserBoards(boards))
    }
}


const initialState = {allBoards: {}, currentProfileBoards: {}}

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS_OF_USER:
            let newState = {}
            for (let board of action.boards) {
                newState[board.id] = board
            }
            return {...state, allBoards: {...state.allBoards}, currentProfileBoards: {...newState}}
        default:
            return state
    }
}