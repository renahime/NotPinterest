// const GET_PROFILE = "users/GET_USER"
// const CLEAR_PROFILE = "users/CLEAR_PROFILE"
// const DELETE_PROFILE = "users/DELETE_PROFILE"
// const EDIT_USER = "users/EDIT_USER"

// const getUser = (user) => ({
//     type: GET_PROFILE,
//     user
// })

// export const clearProfile = () => ({
//     type: CLEAR_PROFILE
// })
// export const editUser = (user) => ({
//     type: EDIT_USER,
//     user
// })

// export const deleteProfile = (user) => ({
//     type: DELETE_PROFILE,
//     user
// })

// export const getUserInfo = (username) => async (dispatch) => {
//     const res = await fetch(`/api/users/users/${username}`)
//     console.log(res.status)
//     console.log("USERNAME for getUserInfo thunk", username)
//     if (res.status >= 400) {
//         console.log("umm no")
//         const userDataErrors = await res.json()
//         return {errors : userDataErrors}
//     }
//     else {
//         console.log("like whatttt")
//         const userData = await res.json()
//         if (userData.errors) {
//             return userData.errors
//         }
//         return dispatch(getUser(userData))
//     }
// }

// export const editProfileThunk = (user) => async (dispatch) => {
//     const res = await fetch(`/api/users/${user.id}`, {
//         method: "PUT",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     });
//     if (res.ok) {
//         const userData = await res.json()
//         if (userData.errors) {
//             return userData.errors
//         }
//         dispatch(editUser(userData))
//     }
// }

// export const deleteProfileThunk = (user) => async (dispatch) => {
//     const res = await fetch(`/api/users/${user.id}`, {
//         method: "DELETE",
//         headers: { 'Content-Type': 'application/json' }
//     });
//     if (res.ok) {
//         const userData = await res.json()
//         if (userData.errors) {
//             return userData.errors
//         }
//         dispatch(deleteProfile(userData))
//     }
// }

// const initialState = { currentProfile: {} }

// export default function profileReducer(state = initialState, action) {
//     switch (action.type) {
//         case GET_PROFILE:
//             return { currentProfile: action.user }
//         case CLEAR_PROFILE:
//             return { currentProfile: {} }
//         case EDIT_USER:
//             return { currentProfile: action.user };
//         case DELETE_PROFILE:
//             return { currentProfile: {} }
//         default:
//             return state
//     }
// }


const GET_PROFILE = "users/GET_USER"
const CLEAR_PROFILE = "users/CLEAR_PROFILE"
const DELETE_PROFILE = "users/DELETE_PROFILE"
const EDIT_USER = "users/EDIT_USER"
const CREATE_BOARD = "users/CREATE_BOARD"
const UPDATE_PROFILE_BOARD = "users/UPDATE_BOARD"
const DELETE_PROFILE_BOARD = "boards/delete/profileboard";

const getUser = (user) => ({
    type: GET_PROFILE,
    user
})

export const clearProfile = () => ({
    type: CLEAR_PROFILE
})
export const editUser = (user) => ({
    type: EDIT_USER,
    user
})

export const deleteProfile = (user) => ({
    type: DELETE_PROFILE,
    user
})

const createBoard = (board) => ({
    type: CREATE_BOARD,
    board
})


const updateProfileBoard = (board) => ({
    type: UPDATE_PROFILE_BOARD,
    board
})

const deleteProfileBoard = (id) => ({
    type: DELETE_PROFILE_BOARD,
    id,
});


export const updateProfileBoardThunk = (board, id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        });
        if (res.ok) {
            const updated_board = await res.json();
            dispatch(updateProfileBoard(updated_board));
            return updated_board;
        } else {
            throw new Error("Update board request failed");
        }
    } catch (error) {
        console.error("Error occurred during updateBoardThunk:", error);
        return null; // or handle the error in an appropriate way
    }
};


export const deleteBoardProfileThunk = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${id}/delete`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = res.json()
            dispatch(deleteProfileBoard(id));
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

export const getUserInfo = (username) => async (dispatch) => {
    const res = await fetch(`/api/users/users/${username}`)
    if (res.status >= 400) {
        const userDataErrors = await res.json()
        return { errors: userDataErrors }
    }
    else {
        const userData = await res.json()
        if (userData.errors) {
            return userData.errors
        }
        return dispatch(getUser(userData))
    }
}

export const editProfileThunk = (user) => async (dispatch) => {
    const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (res.ok) {
        const userData = await res.json()
        if (userData.errors) {
            return userData.errors
        }
        dispatch(editUser(userData))
    }
}

export const deleteProfileThunk = (user) => async (dispatch) => {
    const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(res);
    if (res.ok) {
        const userData = await res.json()
        console.log("user data", userData)
        if (userData.errors) {
            return userData.errors
        }
        dispatch(deleteProfile(userData))
    }
}

export const createBoardFromProfileThunk = (board) => async (dispatch) => {
    const res = await fetch('/api/boards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    })
    if (res.ok) {
        const new_board = await res.json()
        dispatch(createBoard(new_board))
        return new_board
    }
    else {
        return ("Error response:", res)
    }
}

const initialState = { currentProfile: {} }

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, currentProfile: action.user }
        case CREATE_BOARD:
            let newState = { ...state };
            newState.currentProfile.boards.push(action.board);
            return { ...state, currentProfile: { ...newState.currentProfile } }
        case CLEAR_PROFILE:
            return { ...state, currentProfile: {} }
        case EDIT_USER:
            return { ...state, currentProfile: action.user };
        case DELETE_PROFILE:
            return { ...state, currentProfile: {} }
        case UPDATE_PROFILE_BOARD:
            let oldBoardState = { ...state }
            let currentProfileBoardsArr = oldBoardState.currentProfile.boards
            // console.log("WE ARE IN BOARDS UPDATE REDUCER",currentProfileBoardsArr)
            let oldBoardData;
            let oldBoardIndex;
            for (let i = 0; i < currentProfileBoardsArr.length; i++) {
                console.log(currentProfileBoardsArr[i].id)
                console.log(action.board.id)
                if (currentProfileBoardsArr[i].id === action.board.id) {
                    // console.log("NEW BOARD", currentProfileBoardsArr[i])
                    oldBoardData = currentProfileBoardsArr[i]
                    oldBoardIndex = i
                    // console.log("WE ARE IN UPDATE PROFILE REDUCER THUNK", oldBoardData)
                    break
                }
            }
            if (oldBoardIndex !== undefined && oldBoardData) {
                currentProfileBoardsArr[oldBoardIndex] = action.board
            }
            // console.log("NEW BOARD DATA in reducer", oldBoardData)

            return { ...state, currentProfile: { ...oldBoardState.currentProfile, boards: currentProfileBoardsArr } }

        case DELETE_PROFILE_BOARD:
            let stateBeforeBoardDelete = {...state, currentProfile: {...state.currentProfile}}
            let currentProfileBoardstoDeleteArr = stateBeforeBoardDelete.currentProfile.boards
            // console.log("WE ARE IN BOARDS UPDATE REDUCER",currentProfileBoardsArr)
            let BoardData;
            let BoardIndex;
            console.log("BOARDS TO ELETE ARR", currentProfileBoardstoDeleteArr)
            for (let i = 0; i < currentProfileBoardstoDeleteArr.length; i++) {
                console.log("ID",currentProfileBoardstoDeleteArr[i].id)
                console.log(action.id)
                if (currentProfileBoardstoDeleteArr[i].id === action.id) {
                    // console.log("NEW BOARD", currentProfileBoardsArr[i])
                    BoardData = currentProfileBoardstoDeleteArr[i]
                    BoardIndex = i
                    // console.log("WE ARE IN UPDATE PROFILE REDUCER THUNK", oldBoardData)
                    break
                }
            }
            if (BoardIndex !== undefined && BoardData) {
                // currentProfileBoardsArr[oldBoardIndex] = action.board
                console.log("BOARD TO DELETE", BoardData)
                delete stateBeforeBoardDelete.currentProfile.boards[BoardIndex]
            }

            // console.log("BOARD TO DELETE", BoardData)
            return stateBeforeBoardDelete

            default:
            return state
    }
}
