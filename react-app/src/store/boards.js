// import { deleteBoard } from "./session"

const GET_BOARDS_OF_CURRENT_USER = "boards/getUserBoards"
const GET_SINGLE_BOARD = 'boards/single'
// const GET_BOARD_BY_NAME = "boards/getBoardByName"
const CREATE_USER_BOARD = 'boards/new'
const UPDATE_USER_BOARD = 'boards/edit'
const DELETE_BOARD = "boards/delete";
const UN_PIN = "boards/unpin"
const PIN = "boards/pin"
const REPIN = "boards/repin"
const GET_BOARDS_BY_USER = "boards/singleUser"
const CLEAR_BOARD = "boards/clearSingleBoard"
// const GET_ALL_CURRENT_USER_BOARD_PINS = "boards/userBoardPins"



const getSingleBoard = (board) => ({
    type: GET_SINGLE_BOARD,
    board
})

const getBoardsOfCurrentUser = (boards) => ({
    type: GET_BOARDS_OF_CURRENT_USER,
    boards: boards
})

const createUserBoard = (board) => ({
    type: CREATE_USER_BOARD,
    board
})

const updateUserBoard = (board) => ({
    type: UPDATE_USER_BOARD,
    board
})

const deleteUserBoard = (id) => ({
    type: DELETE_BOARD,
    id
});

// const getAllBoardPinsOfCurrentUser = (pins) => ({
//     type: GET_ALL_CURRENT_USER_BOARD_PINS,
//     pins
// })

const rePin = (pin, oldBoardId, newBoardId) => ({
    type: REPIN,
    pin,
    oldBoardId,
    newBoardId
})

const pinBoard = (pin, boardId) => ({
    type: PIN,
    pin,
    boardId,
})

const unPin = (pin, boardId) => ({
    type: UN_PIN,
    pin,
    boardId,
})

const otherUserBoards = (boards) => ({
    type: GET_BOARDS_BY_USER,
    boards
})

export const clearBoard = () => ({
    type: CLEAR_BOARD
})


// export const getUserBoarPins = () => async(dispatch) => {
//     let res = await fetch("/api/pins/user/boards")

//     if (res.ok) {
//         let boards = await res.json()
//         dispatch(getAllBoardPinsOfCurrentUser(boards))
//         return boards
//     } else {
//         let errors = await res.json()
//         return errors
//     }
// }

export const deleteBoard = (id) => async(dispatch) => {
    let res = await fetch(`/api/boards/${id}/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        let message = await res.json()
        dispatch(deleteUserBoard(id))
        return message
    } else {
        let errors = await res.json()
        return errors
    }
}

export const getCurrentUserBoards = () => async(dispatch) => {
    const res = await fetch("/api/boards/current_user")

    if (res.ok) {
        let boards = await res.json()
        dispatch(getBoardsOfCurrentUser(boards))
        return
    }
}

export const getOtherUserBoards = (username) => async(dispatch) => {
    let res = await fetch(`/api/boards/users/${username}`)
    if (res.ok) {
        let boards = await res.json()
        dispatch(otherUserBoards(boards))
        return boards
    }
}


export const getSingleBoardThunk = (username, boardname) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}/${boardname}`);
    if (res.ok) {
        let board = await res.json();
        dispatch(getSingleBoard(board));
        return board;
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
        dispatch(createUserBoard(new_board))
        return new_board
    }
    else {
        return ("Error response:", res)
    }
}

// export const getAllBoardsThunk = () => async (dispatch) => {
//     const res = await fetch("/api/boards/").catch((e) => console.log("ALL BOARDS"))
//     if (res.status >= 400) {
//         console.log("in the get all boards of all boards reducer")
//         return
//     }
//     if (res.ok) {
//         let boards = await res.json()
//         console.log("all boards", boards)
//         dispatch(getAllBoards(boards))
//         return boards
//     }
// }

export const updateBoardThunk = (board, id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        });
        if (res.ok) {
            const updated_board = await res.json();
            dispatch(updateUserBoard(updated_board));
            return updated_board;
        } else {
            throw new Error("Update board request failed");
        }
    } catch (error) {
        console.error("Error occurred during updateBoardThunk:", error);
        return null; // or handle the error in an appropriate way
    }
};



// export const clearSingleBoard = (id) => async (dispatch) => {
//     const res = await fetch(`/api/boards/${id}/delete`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         const data = res.json()
//         dispatch(deleteBoard)
//         return data;
//     }
//     else {
//         dispatch(deleteBoard)
//     }

// };

export const pinThunk = (pin, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/pin/${pin.id}`, {
        method: "POST",
    });
    if (res.ok) {
        dispatch(pinBoard(pin, boardId));
        return pin
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const unpinThunk = (pin, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/unpin/${pin.id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(unPin(pin, boardId));
        return pin
    } else {
        const errors = await res.json();
        return errors;
    }
}


export const repinThunk = (pin, oldBoardId, newBoardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${oldBoardId}/${pin.id}/pin_to/${newBoardId}`, {
        method: "POST",
    });
    if (res.ok) {
        dispatch(rePin(pin, oldBoardId, newBoardId));
        return pin
    } else {
        const errors = await res.json();
        return errors;
    }
}

// export const getBoardByName = (username, boardname) => async (dispatch) => {
//     try {
//         const res = await fetch(`/api/boards/users/${username}/${boardname}`);
//         if (res.ok) {
//             let board = await res.json();
//             dispatch(getOneBoardByName(board));
//         } else {
//             throw new Error("Error occured getting board by name")
//         }
//     } catch (error) {
//         // Handle any error that occurred during the fetch request
//         console.error("Error fetching board:", error);
//     }
// };



const initialState = { singleBoard: {}, 
                        allBoards: {}, 
                        currentUserBoards: {}, 
                        currentProfileBoards: {}
                    }

export default function boardsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case UN_PIN:
            newState = {...state, 
                singleBoard: {...state.singleBoard}, 
                allBoards: {...state.allBoards}, 
                currentUserBoards: {...state.currentUserBoards}, 
                currentProfileBoards: {...state.currentProfileBoards}
            }

            newState.currentUserBoards[action.boardId].pins = {...state.currentUserBoards[action.boardId].pins}
            delete newState.currentUserBoards[action.boardId].pins[action.pin.id]
  
            return newState
        case PIN:
            return {
                ...state,
                singleBoard: { ...state.singleBoard },
                allBoards: { ...state.allBoards },
                currentUserBoards: { ...state.currentUserBoards, 
                                    [action.boardId]: {...state.currentUserBoards[action.boardId], 
                                        pins : {...state.currentUserBoards[action.boardId].pins, 
                                            [action.pin.id]: action.pin}
                                        }
                                    },
                currentProfileBoards: { ...state.currentProfileBoards },
                currentBoardPins: { ...state.currentBoardPins, [action.pin.id]: action.pin },
            }
        case CLEAR_BOARD:
            return {...state, 
                singleBoard: {}, 
                allBoards: {...state.allBoards},
                currentUserBoards: {...state.currentUserBoards},
                currentProfileBoards: {...state.currentProfileBoards}
            }
        case GET_BOARDS_BY_USER:
            return {...state,
                singleBoard: {...state.singleBoard},
                allBoards: {...state.allBoards}, 
                currentUserBoards: {...state.currentUserBoards}, 
                currentProfileBoards: action.boards
            }
        case GET_BOARDS_OF_CURRENT_USER:
            return {...state, 
                singleBoard: {...state.singleBoard}, 
                allBoards: {...state.allBoards}, 
                currentUserBoards: {...action.boards}, 
                currentProfileBoards: {...state.currentProfileBoards}
            }
        case CREATE_USER_BOARD:
            return {
                ...state, 
                singleBoard: {},
                allBoards: {
                    ...state.allBoards, [action.board.id]: action.board
                }, currentUserBoards: {
                    ...state.currentUserBoards, [action.board.id]: action.board
                }, 
                currentProfileBoards: {...state.currentProfileBoards}
            };
        case GET_SINGLE_BOARD:
            return {...state, 
                singleBoard: action.board, 
                allBoards: {...state.allBoards}, 
                currentUserBoards: {...state.currentUserBoards}, 
                currentProfileBoards: {...state.currentProfileBoards}
            };
        case UPDATE_USER_BOARD:
            let newState5 = {...state, 
                singleBoard: {...state.singleBoard}, 
                allBoards: {...state.allBoards, [action.board.id]: action.board}, 
                currentUserBoards: {...state.currentUserBoards, [action.board.id]: action.board}, 
                currentProfileBoards: {...state.currentProfileBoards}}

            if (newState5.singleBoard.id === action.board.id) {
                newState5.singleBoard = action.board;
            }
            return newState5;
        case DELETE_BOARD:
            let newState6 = {...state, 
                singleBoard: {...state.singleBoard}, 
                allBoards: {...state.allBoards}, 
                currentUserBoards: {...state.currentUserBoards}, 
                currentProfileBoards: {...state.currentProfileBoards}}
            delete newState6.allBoards[action.id]
            delete newState6.currentUserBoards[action.id]
            return newState6
        case REPIN:
            let newState7 = {...state, 
                singleBoard: {...state.singleBoard}, 
                allBoards: {...state.allBoards}, 
                currentUserBoards: {...state.currentUserBoards}, 
                currentProfileBoards: {...state.currentProfileBoards}
            }
            newState7.currentUserBoards[action.newBoardId].pins = {...state.currentUserBoards[action.newBoardId].pins}
            newState7.currentUserBoards[action.oldBoardId].pins = {...state.currentUserBoards[action.oldBoardId].pins}

            newState7.currentUserBoards[action.newBoardId].pins[action.pin.id] = action.pin
            delete newState7.currentUserBoards[action.oldBoardId].pins[action.pin.id]

            return newState7
        default:
            return state
    }
}
