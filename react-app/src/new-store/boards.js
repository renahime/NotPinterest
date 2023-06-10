const GET_ALL_BOARDS = "boards/all"
const CREATE_USER_BOARD = 'boards/new'
const UPDATE_USER_BOARD = 'boards/edit'
const DELETE_USER_BOARD = "boards/delete";
const UN_PIN = "boards/unpin"
const PIN = "boards/pin"
const REPIN = "boards/repin"







const getAllBoards = (boards) => ({
    type: GET_ALL_BOARDS,
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
    type: DELETE_USER_BOARD,
    id,
});


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

export const getAllBoardsThunk = () => async (dispatch) => {
    const res = await fetch("/api/boards/").catch((e) => console.log("ALL BOARDS"))
    if (res.status >= 400) {
        console.log("in the get all boards of all boards reducer")
        return
    }
    if (res.ok) {
        let boards = await res.json()
        console.log("all boards", boards)
        dispatch(getAllBoards(boards))
        return boards
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



const initialState = { allBoards: {} }




export default function boardsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {

        case GET_ALL_BOARDS:
            return { ...state, allBoards: { ...action.allBoards } }

        case CREATE_USER_BOARD:
            return {
                ...state, allBoards: {
                    ...state.allBoards, [action.board.id]: action.board
                }
            };

        case DELETE_USER_BOARD:
            const newAllBoards = { ...state.allBoards };
            delete newAllBoards[action.id];
            return {
                ...state,
                allBoards: newAllBoards,
            };

        case UPDATE_USER_BOARD:
            newState = {
                ...state,
                allBoards: {
                    ...state.allBoards,
                    [action.board.id]: action.board
                }
            };
            return newState;


        case UN_PIN:
            const unPinAllBoards = { ...state.allBoards }
            // if (typeof unPinSingle === 'object') {
            //     if (action.pin.id.toString() in unPinSingle.pinInfo) {
            //         delete unPinSingle.pinInfo[action.pin.id.toString()]
            //     }
            // }
            return { ...state, allBoards: unPinAllBoards }

        case PIN:
            const pinAllBoards = { ...state.allBoards }

            // if (typeof pinSingle === 'object') {
            //     if ("pinInfo" in pinSingle)
            //         pinSingle.pinInfo[action.pin.id.toString()] = action.pin;
            // }
            return { ...state, allBoards: pinAllBoards }
        case REPIN:
            const repinAllBoards = { ...state.allBoards }

            return { ...state, allBoards: repinAllBoards }


        default:
            return state
    }
}
