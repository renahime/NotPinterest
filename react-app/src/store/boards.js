const GET_BOARDS_OF_USER = "boards/getUserBoards"
const GET_BOARD_BY_NAME = "boards/getBoardByName"
const CREATE_USER_BOARD = 'boards/new'
const UPDATE_USER_BOARD = 'boards/edit'
const DELETE_USER_BOARD = "boards/delete";
const UN_PIN = "boards/unpin"
const PIN = "boards/pin"
const REPIN = "boards/repin"
const GET_CURRENT_USER_BOARDS = "boards/getCurrentUser"





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

const getCurrentUserBoard = (boards) => ({
    type: GET_CURRENT_USER_BOARDS,
    boards
})

const unPin = (pin, boardId) => ({
    type: UN_PIN,
    pin,
    boardId,
})

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



export const getBoardsofCurrentUser = () => async (dispatch) => {
    const res = await fetch("/api/boards/current_user").catch((e) => console.log("whatever"))
    if (res.status >= 400) {
        console.log("in the get boards of current user reducer")
        return
    }
    if (res.ok) {
        let boards = await res.json()
        console.log("boards", boards)
        dispatch(getCurrentUserBoard(boards))
        return
    }
}

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

export const getBoardByName = (username, boardname) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}/${boardname}`)
    if (res.ok) {
        let board = await res.json()
        dispatch(getOneBoardByName(board))
    }
}


const initialState = { allBoards: {}, currentProfileBoards: {}, singleBoard: {}, currentUserBoards:{} }

export default function boardsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_CURRENT_USER_BOARDS:
            return { ...state, allBoards: { ...state.allBoards }, currentProfileBoards: { ...state.currentProfileBoards }, singleBoard: { ...state.singleBoard }, currentUserBoards: { ...action.boards } }
        case GET_BOARDS_OF_USER:
            let newState = {}
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
            if (typeof unPinSingle === 'object') {
                if (action.pin.id.toString() in unPinSingle.pinInfo) {
                    delete unPinSingle.pinInfo[action.pin.id.toString()]
                }
            }
            return { ...state, allBoards: unPinAllBoards, currentProfileBoards: unPinCurrent, singleBoard: unPinSingle }
        case PIN:
            const pinAllBoards = { ...state.allBoards }
            const pinCurrent = { ...state.currentProfileBoards }
            const pinSingle = { ...state.singleBoard }
            if (typeof pinSingle === 'object') {
                if ("pinInfo" in pinSingle)
                    pinSingle.pinInfo[action.pin.id.toString()] = action.pin;
            }
            return { ...state, allBoards: pinAllBoards, currentProfileBoards: pinCurrent, singleBoard: pinSingle }
        case REPIN:
            const repinAllBoards = { ...state.allBoards }
            const repinCurrent = { ...state.currentProfileBoards }
            const repinSingle = { ...state.singleBoard }
            if (typeof repinSingle === 'object') {
                if ("pinInfo" in repinSingle) {
                    if (action.oldBoardId.toString() in repinSingle.pinInfo) {
                        delete repinSingle.pinInfo[action.pin.id.toString()]
                    }
                    if (action.newBoardId.toString() in repinSingle.pinInfo) {
                        repinSingle.pinInfo[action.pin.id.toString()] = action.pin
                    }
                }
            }
            return { ...state, allBoards: repinAllBoards, currentProfileBoards: repinCurrent, singleBoard: repinSingle }
        default:
            return state
    }
}
