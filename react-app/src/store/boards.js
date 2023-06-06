const GET_BOARDS_OF_USER = "boards/getUserBoards"
const CREATE_USER_BOARD = 'boards/new'
const UPDATE_USER_BOARD = 'boards/edit'



const getUserBoards = (boards) => ({
    type: GET_BOARDS_OF_USER,
    boards
})


const createUserBoard = (board) => ({
    type: CREATE_USER_BOARD,
    board
})

const updateUserBoard = (board) => ({
    type: UPDATE_USER_BOARD,
    board
})


export const getBoardsByUsername = (username) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}`)
    if (res.ok) {
        let boards = await res.json()
        dispatch(getUserBoards(boards))
    }
}

export const createBoardThunk = (board) => async (dispatch) => {
    const res = await fetch('/api/boards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    })

    if (res.ok) {
        const new_board = await res.json()
        console.log("CREATE BOARD THUNK: new-board response", new_board)
        dispatch(createUserBoard(new_board))
        return new_board
    }
    else {
        return ("Error response:", res)
    }
}










export const updateBoardThunk = (board, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/boardId`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    })

    console.log("UPDATE BOARD THUNK RESPONSE", res)

    if (res.ok) {
        const updated_board = await res.json()
        dispatch(updateUserBoard(board))
        return updated_board

    } else {
        return ("Error response:", res)
    }

}


const initialState = { allBoards: {}, currentProfileBoards: {} }

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS_OF_USER:
            return { ...state, allBoards: { ...state.allBoards }, currentProfileBoards: { ...action.boards } }

        case CREATE_USER_BOARD:
            return {
                ...state, allBoards: {
                    ...state.allBoards, [action.board.id]: action.board
                }, currentProfileBoards: {
                    ...state.currentProfileBoards,
                    [action.board.id]: action.board
                }
            };
            console.log("New State:", newState);
            return newState;

        case UPDATE_USER_BOARD:

            const newState = {
                ...state,
                allBoards: {
                    ...state.allBoards,
                    [action.board.id]: action.board
                },
                currentProfileBoards: {
                    ...state.currentProfileBoards,
                    [action.board.id]: action.board 
                }
            };
            console.log("New State:", newState);
            return newState;


        default:
            return state
    }
}
