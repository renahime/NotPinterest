const GET_BOARDS_OF_USER = "boards/getUserBoards"
const GET_BOARD_BY_NAME = "boards/getBoardsByName"

const getUserBoards = (boards) => ({
    type: GET_BOARDS_OF_USER,
    boards: boards["User Boards"]
})

const getOneBoardByName = (board) => ({
    type: GET_BOARD_BY_NAME,
    board: board["User Boards"]
})

export const getBoardsByUsername = (username) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}`)
    console.log("res", res)
    if (res.ok) {
        let boards = await res.json()
        dispatch(getUserBoards(boards))
    }
}

export const getBoardByName = (username, boardname) => async (dispatch) => {
    console.log(username)
    const res = await fetch(`/api/boards/users/${username}/${boardname}`)
    console.log(res)
    if (res.ok) {
        let board = await res.json()
        dispatch(getOneBoardByName(board))
    }
}


const initialState = { allBoards: {}, currentProfileBoards: {}, singleBoard: {} }

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS_OF_USER:
            let newState = {}
            // console.log("action.boards", action.boards)
            // for (let board of action.boards) {
            //     newState[board.id] = board
            // }
            return { ...state, allBoards: { ...state.allBoards }, currentProfileBoards: { ...newState }, singleBoard: {} }
        case GET_BOARD_BY_NAME:
            return { ...state, allBoards: { ...state.allBoards }, currentProfileBoards: { ...state.currentProfileBoards }, singleBoard: { ...action.board } }
        default:
            return state
    }
}
