import { deleteBoard } from "./session"

const GET_BOARDS_OF_USER = "boards/getUserBoards"
const GET_SINGLE_BOARD = 'boards/single'
// const GET_BOARD_BY_NAME = "boards/getBoardByName"
const CREATE_USER_BOARD = 'boards/new'
const UPDATE_USER_BOARD = 'boards/edit'
const DELETE_BOARD = "boards/delete";
const UN_PIN = "boards/unpin"
const PIN = "boards/pin"
const REPIN = "boards/repin"



const getSingleBoard = (board) => ({
    type: GET_SINGLE_BOARD,
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

const deleteUserBoard = () => ({
    type: DELETE_BOARD,
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




export const getSingleBoardThunk = (username, boardname) => async (dispatch) => {
    const res = await fetch(`/api/boards/users/${username}/${boardname}`);
    if (res.ok) {
        let board = await res.json();
        dispatch(getSingleBoard(board));
        return;
    }
}

// export const getBoardsByUsername = (username) => async (dispatch) => {
//     const res = await fetch(`/api/boards/users/${username}`)
//     if (res.ok) {
//         let boards = await res.json()
//         console.log("GET BOARDS BY USERNAME TEST", boards)
//         dispatch(getUserBoards(boards))
//     }
// }

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



export const clearSingleBoard = (id) => async (dispatch) => {
    const res = await fetch(`/api/boards/${id}/delete`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = res.json()
        dispatch(deleteBoard)
        return data;
    }
    else {
        dispatch(deleteBoard)
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

const initialState = { singleBoard: {} }

export default function boardsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case CREATE_USER_BOARD:
            return {
                ...state, allBoards: {
                    ...state.allBoards, [action.board.id]: action.board
                },
            };
        case GET_SINGLE_BOARD:
            return { ...state, singleBoard: { ...action.board } };

        case UPDATE_USER_BOARD:
            if (state.singleBoard.id === action.board.id) {
                state.singleBoard = action.board;
            }
            newState = {
                ...state,
                allBoards: {
                    ...state.allBoards,
                    [action.board.id]: action.board
                },
                singleBoard: {
                    ...state.singleBoard
                }
            };
            return newState;
        case DELETE_BOARD:
            state.singleBoard = {}

            return {
                ...state,
                singleBoard: { ...state.singleBoard }
            };
        case UN_PIN:
            const unPinSingle = { ...state.singleBoard }
            if (typeof unPinSingle === 'object') {
                if (action.pin.id.toString() in unPinSingle.pinInfo) {
                    delete unPinSingle.pinInfo[action.pin.id.toString()]
                }
            }
            return { ...state, singleBoard: unPinSingle }
        case PIN:
            const pinSingle = { ...state.singleBoard }
            if (typeof pinSingle === 'object') {
                if ("pinInfo" in pinSingle)
                    pinSingle.pinInfo[action.pin.id.toString()] = action.pin;
            }
            return { ...state, singleBoard: pinSingle }
        case REPIN:
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
            return { ...state, singleBoard: repinSingle }
        default:
            return state
    }
}
