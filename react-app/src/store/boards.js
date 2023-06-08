const GET_BOARDS_OF_USER = "boards/getUserBoards"
const GET_BOARD_BY_NAME = "boards/getBoardByName"
const CREATE_USER_BOARD = 'boards/new'
const UPDATE_USER_BOARD = 'boards/edit'
const DELETE_USER_BOARD = "boards/delete";
const UN_PIN = "boards/unpin"
const PIN = "boards/pin"
const REPIN = "boards/repin"





const getUserBoards = (boards) => ({
    type: GET_BOARDS_OF_USER,
    boards: boards["User Boards"]
})

const getOneBoardByName = (board) => ({
    type: GET_BOARD_BY_NAME,
    board: board["User Boards"]
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
    type: DELETE_USER_BOARD,
    id,
});

const unPin = (pinId, boardId) => ({
    type: UN_PIN,
    pinId,
    boardId,
})

const rePin = (pinId, oldBoardId, newBoardId) => ({
    type: REPIN,
    pinId,
    oldBoardId,
    newBoardId
})

const pinBoard = (pinId, boardId) => ({
    type: PIN,
    pinId,
    boardId,
})



export const getBoardsByUsername = (username) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}`)
    console.log("res", res)
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



export const deleteBoardThunk = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${id}/delete`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = res.json()
            dispatch(deleteUserBoard(id));
            return data;
        }
        else {
            throw new Error("Delete board request failed");
        }
    } catch (error) {
        console.error("Error occurred during deleteBoardThunk:", error);
        return false;
    }
};



const initialState = { allBoards: {}, currentProfileBoards: {}, singleBoard: {} }
export const getBoardByName = (username, boardname) => async (dispatch) => {
    console.log(username)
    const res = await fetch(`/api/boards/users/${username}/${boardname}`)
    console.log(res)
    if (res.ok) {
        let board = await res.json()
        dispatch(getOneBoardByName(board))
    }
}


export const unpinThunk = (pinId, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/unpin/${pinId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(unPin(pinId, boardId));
        return pinId
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const pinThunk = (pinId, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/pin/${pinId}`, {
        method: "POST",
    });
    if (res.ok) {
        dispatch(pinBoard(pinId, boardId));
        return pinId
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const repinThunk = (pinId, oldBoardId, newBoardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${oldBoardId}/${pinId}/pin_to/${newBoardId}`, {
        method: "POST",
    });
    if (res.ok) {
        dispatch(rePin(pinId, oldBoardId, newBoardId));
        return pinId
    } else {
        const errors = await res.json();
        return errors;
    }
}





export default function boardsReducer(state = initialState, action) {
    let newState = {}

    switch (action.type) {
        case GET_BOARDS_OF_USER:
            let newState = {}
            console.log("action.boards", action.boards)
            for (let board of action.boards) {
                newState[board.id] = board
            }
            return { ...state, allBoards: { ...state.allBoards }, currentProfileBoards: { ...newState }, singleBoard: {} }
        case CREATE_USER_BOARD:
            return {
                ...state, allBoards: {
                    ...state.allBoards, [action.board.id]: action.board
                }, currentProfileBoards: {
                    ...state.currentProfileBoards,
                    [action.board.id]: action.board
                }
            };
        case UPDATE_USER_BOARD:
            newState = {
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
            return newState;
        case DELETE_USER_BOARD:
            const newAllBoards = { ...state.allBoards };
            const updatedCurrentProfileBoards = { ...state.currentProfileBoards };
            delete newAllBoards[action.id];
            delete updatedCurrentProfileBoards[action.id];
            return {
                ...state,
                allBoards: newAllBoards,
                currentProfileBoards: updatedCurrentProfileBoards,
            };
        case GET_BOARD_BY_NAME:
            return { ...state, allBoards: { ...state.allBoards }, currentProfileBoards: { ...state.currentProfileBoards }, singleBoard: { ...action.board } }
        case UN_PIN:
            const unPinAllBoards = { ...state.allBoards }
            const unPinCurrent = { ...state.currentProfileBoards }
            const unPinSingle = { ...state.singleBoard }
            if (action.boardId.toString() in unPinAllBoards) {
                for (let pinIndex in unPinAllBoards[action.boardId].pins) {
                    if (unPinAllBoards[action.boardId].pins[pinIndex] === action.pinId) {
                        unPinAllBoards[action.boardId].pins.splice(pinIndex, 1)
                    }
                }
            }
            if (action.boardId.toString() in unPinAllBoards) {
                for (let pinIndex in unPinCurrent[action.boardId].pins) {
                    if (unPinCurrent[action.boardId].pins[pinIndex] === action.pinId) {
                        unPinCurrent[action.boardId].pins.splice(pinIndex, 1)
                    }
                }
            }
            if (action.boardId.toString() in unPinSingle) {
                for (let pinIndex in unPinSingle[action.boardId].pins) {
                    if (unPinSingle[action.boardId].pins[pinIndex] === action.pinId) {
                        unPinSingle[action.boardId].pins.splice(pinIndex, 1)
                    }
                }

            }
            return { ...state, allBoards: unPinAllBoards, currentProfileBoards: unPinCurrent, singleBoard: unPinSingle }
        case PIN:
            const pinAllBoards = { ...state.allBoards }
            const pinCurrent = { ...state.currentProfileBoards }
            const pinSingle = { ...state.singleBoard }
            if (action.boardId.toString() in pinAllBoards) {
                pinAllBoards[action.boardId].pins.push(action.pinId)
            }
            if (action.boardId.toString() in pinCurrent) {
                pinCurrent[action.boardId].pins.push(action.pinId)
            }
            if (action.boardId.toString() in pinSingle) {
                pinSingle[action.boardId].pins.push(action.pinId)
            }
            return { ...state, allBoards: pinAllBoards, currentProfileBoards: pinCurrent, singleBoard: pinSingle }
        case REPIN:
            const repinAllBoards = { ...state.allBoards }
            const repinCurrent = { ...state.currentProfileBoards }
            const repinSingle = { ...state.singleBoard }
            if (action.oldBoardId.toString() in repinAllBoards) {
                for (let pinIndex in repinAllBoards[action.oldBoardId.toString()].pins) {
                    if (repinAllBoards[action.boardId.toString()].pins[pinIndex] === action.pinId) {
                        repinAllBoards[action.boardId.toString()].pins.splice(pinIndex, 1)
                    }
                }
            }
            if (action.oldBoardId.toString() in repinCurrent) {
                for (let pinIndex in repinCurrent[action.oldBoardId.toString()].pins) {
                    if (repinCurrent[action.boardId.toString()].pins[pinIndex] === action.pinId) {
                        repinCurrent[action.boardId.toString()].pins.splice(pinIndex, 1)
                    }
                }
            }
            if (action.oldBoardId.toString() in repinSingle) {
                for (let pinIndex in repinSingle[action.oldBoardId.toString()].pins) {
                    if (repinSingle[action.boardId.toString()].pins[pinIndex] === action.pinId) {
                        repinSingle[action.boardId.toString()].pins.splice(pinIndex, 1)
                    }
                }
            }
            if (action.newBoardId.toString() in repinAllBoards) {
                repinAllBoards[action.newBoardId.toString()].pins.push(action.pinId)
            }
            if (action.newboardId.toString() in repinCurrent) {
                repinCurrent[action.newBoardId.toString()].pins.push(action.pinId)
            }
            if (action.newboardId.toString() in repinSingle) {
                repinSingle[action.newBoardId.toString()].pins.push(action.pinId)
            }
            return { ...state, allBoards: repinAllBoards, currentProfileBoards: repinCurrent, singleBoard: repinSingle }
        default:
            return state
    }
}
