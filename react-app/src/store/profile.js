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
const CREATE_BOARD = "users/CREATE_BOARD"

const getUser = (user) => ({
    type: GET_PROFILE,
    user
})

export const clearProfile = () => ({
    type: CLEAR_PROFILE
})

export const deleteProfile = (user) => ({
    type: DELETE_PROFILE,
    user
})

const createBoard = (board) => ({
    type: CREATE_BOARD,
    board
})

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
        case DELETE_PROFILE:
            return { ...state, currentProfile: {} }
        default:
            return state
    }
}