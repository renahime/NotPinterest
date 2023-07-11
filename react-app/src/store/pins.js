// const GET_ALL_PINS = "pins/getallpins"
// const CREATE_PIN = "pins/createNewPin"
// const DELETE_PIN = "pins/delete"
// const UPDATE_USER_PIN = "pins/edit"



// const createPin = (pin) => ({
//     type: CREATE_PIN,
//     pin
// })

// const getAllPins = (pins) => ({
//     type: GET_ALL_PINS,
//     pins
// })


// const deletePin = (pinId) => ({
//     type: DELETE_PIN,
//     pinId
// })

// const updateUserPin = (pin) => ({
//     type: UPDATE_USER_PIN,
//     pin
// })



// export const getAllPinsThunk = (pins) => async (dispatch) => {
//     let res = await fetch(`/api/pins/`)
//     if (res.ok) {
//         let pins = await res.json()
//         dispatch(getAllPins(pins))
//     } else {
//         let errors = res.json()
//         return errors
//     }
// }


// export const createNewPin = (pin) => async (dispatch) => {
//     const res = await fetch("/api/pins/new", {
//         method: "POST",
//         body: pin
//     })

//     if (res.ok) {
//         const new_pin = await res.json()
//         return dispatch(createPin(new_pin))
//     } else {
//         const errors = await res.json()
//         return errors
//     }
// }


// export const deletePinThunk = (pinId) => async (dispatch) => {
//     const res = await fetch(`/api/pins/${pinId}/delete`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         dispatch(deletePin(pinId));
//         return pinId
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// };




// export const updatePinThunk = (pin) => async (dispatch) => {
//     try {
//         const res = await fetch(`/api/pins/${pin.id}`, {
//             method: "PUT",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(pin)
//         });
//         if (res.ok) {
//             const updatedPin = await res.json();
//             dispatch(updateUserPin(updatedPin));
//             return updatedPin;
//         } else {
//             throw new Error("Update pin request failed");
//         }
//     } catch (error) {
//         console.error("Error occurred during updatePinhunk:", error);
//         return null;
//     }
// };


// const initialState = { pins: {} }

// export default function pinsReducer(state = initialState, action) {
//     switch (action.type) {

//         case GET_PIN:
//             return { ...state, pins: { ...state.pins } }
//         case CREATE_PIN:
//             return { ...state, pins: { ...state.pins, [action.pin.id]: action.pin } }
//         case DELETE_PIN:
//             const newPins = { ...state.pins };
//             delete newPins[action.id];
//             return {
//                 ...state,
//                 pins: newPins,
//             };
//         case UPDATE_USER_PIN:
//             const updatedPins = { ...state.pins, [action.pin.id]: action.pin };
//             return { ...state, pins: updatedPins }
//         default:
//             return state
//     }
// }




const CREATE_PIN = "pins/createNewPin"
const GET_PIN = "pins/getById"
const DELETE_PIN = "pins/delete"
const UPDATE_USER_PIN = "pins/edit"
const GET_ALL_PINS = "pins/all"
const CLEAR_SINGLE_PIN = "pin/clear"
const CLEAR_ALL_PINS = "pins/clear"
const GET_CURRENT_USER_PINS = "pins/currentUser"
const GET_OTHER_USER_PINS = "pins/otherUser"
const GET_PINS_OF_BOARD = "pins/boardPins"
const CLEAR_BOARD_PINS = "pins/clearBoardPins"
// const GET_ALL_CURRENT_USER_BOARD_PINS = "boards/userBoardPins"

const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})

const getPin = (pin) => ({
    type: GET_PIN,
    pin
})

const getAllPins = (pins) => ({
    type: GET_ALL_PINS,
    pins
})

export const clearSinglePin = () => ({
    type: CLEAR_SINGLE_PIN
})

const deletePin = (pinId) => ({
    type: DELETE_PIN,
    pinId
})

const updateUserPin = (pin) => ({
    type: UPDATE_USER_PIN,
    pin
})

const getPinsOfCurrentUser = (pins) => ({
    type: GET_CURRENT_USER_PINS,
    pins
})

const getPinsOfOthertUser = (pins) => ({
    type: GET_OTHER_USER_PINS,
    pins
})

const getPinsOfBoard = (pins) => ({
    type: GET_PINS_OF_BOARD,
    pins
})

export const clearBoardPins = () => ({
    type: CLEAR_BOARD_PINS
})

// const pinBoard = (pin, boardId) => ({
//     type: PIN,
//     pin,
//     boardId,
// })

// const unPin = (pin, boardId) => ({
//     type: UN_PIN,
//     pin,
//     boardId,
// })

// const getAllBoardPinsOfCurrentUser = (pins) => ({
//     type: GET_ALL_CURRENT_USER_BOARD_PINS,
//     pins
// })

// export const unpinThunk = (pin, boardId) => async (dispatch) => {
//     const res = await fetch(`/api/boards/${boardId}/unpin/${pin.id}`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         dispatch(unPin(pin, boardId));
//         return pin
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const getUserBoarPins = () => async(dispatch) => {
//     let res = await fetch("/api/pins/user/boards")

//     if (res.ok) {
//         let pins = await res.json()
//         dispatch(getAllBoardPinsOfCurrentUser(pins))
//         return pins
//     } else {
//         let errors = await res.json()
//         return errors
//     }
// }

// export const pinThunk = (pin, boardId) => async (dispatch) => {
//     const res = await fetch(`/api/boards/${boardId}/pin/${pin.id}`, {
//         method: "POST",
//     });
//     if (res.ok) {
//         dispatch(pinBoard(pin, boardId));
//         return pin
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }



export const getPinsForBoard = (id) => async (dispatch) => {
    let res = await fetch(`/api/pins/boards/${id}`)
    if (res.ok) {
        let pins = await res.json()
        dispatch(getPinsOfBoard(pins))
        return pins
    }
}

export const getOtherUserPins = (username) => async (dispatch) => {
    const res = await fetch(`/api/pins/users/${username}`)
    if (res.ok) {
        let pins = await res.json()
        dispatch(getPinsOfOthertUser(pins))
        return pins
    }
}

export const getCurrentUserPins = () => async (dispatch) => {
    const res = await fetch("/api/pins/current_user")
    if (res.ok) {
        let pins = await res.json()
        dispatch(getPinsOfCurrentUser(pins))
        return pins
    }
}

export const createNewPin = (pin_info) => async (dispatch) => {
    const res = await fetch("/api/pins/new", {
        method: "POST",
        body: pin_info
    })

    if (res.ok) {
        const new_pin = await res.json()
        dispatch(createPin(new_pin))
        return new_pin
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getAllPinsThunkOld = () => async (dispatch) => {
    let res = await fetch(`/api/pins/`)
    if (res.ok) {
        let pins = await res.json()
        dispatch(getAllPins(pins))
    } else {
        let errors = res.json()
        return errors
    }
}


export const deletePinThunk = (pinId) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pinId}/delete`, {
        method: "DELETE",
    });
    if (res.ok) {
        let response = await res.json()
        dispatch(deletePin(pinId));
        return response
    } else {
        const errors = await res.json();
        return false;
    }
};

export const getPinById = (pin_id) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pin_id}`)

    if (res.ok) {
        const pin = await res.json()
        dispatch(getPin(pin))
        return pin
    }

}


export const updatePinThunk = (pin) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pin.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pin)
    });
    if (res.ok) {
        const new_pin = await res.json()
        return dispatch(updateUserPin(new_pin))
    } else {
        const errors = await res.json()
        return errors
    }
};

const initialState = { pins: {}, 
                        singlePin: {}, 
                        currentBoardPins: {}, 
                        currentUserPins: {}, 
                        currentProfilePins: {}, 
                        // currentUserBoardPins: {} 
                    }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        // case GET_ALL_CURRENT_USER_BOARD_PINS:
        //     return {
        //         ...state,
        //         pins: { ...state.pins},
        //         singlePin: { ...state.singlePin },
        //         currentBoardPins: { ...state.currentBoardPins },
        //         currentUserPins: { ...state.currentUserPins },
        //         currentProfilePins: { ...state.currentProfilePins },
        //         currentUserBoardPins: {...action.pins}
        //     }
        // case UN_PIN:
        //     let newState = {
        //         ...state,
        //         pins: { ...state.pins },
        //         singlePin: { ...state.singlePin },
        //         currentBoardPins: { ...state.currentBoardPins },
        //         currentUserPins: { ...state.currentUserPins },
        //         currentProfilePins: { ...state.currentProfilePins }
        //     }
        //     delete newState.currentBoardPins[action.pin.id]          
        //     return newState
        // case PIN:
        //     return {
        //         ...state,
        //         pins: { ...state.pins },
        //         singlePin: { ...state.singlePin },
        //         currentBoardPins: { ...state.currentBoardPins, [action.pin.id]: action.pin },
        //         currentUserPins: { ...state.currentUserPins },
        //         currentProfilePins: { ...state.currentProfilePins }
        //     }
        case CLEAR_BOARD_PINS:
            return {
                ...state,
                pins: { ...state.pins },
                singlePin: { ...state.singlePin },
                currentBoardPins: {},
                currentUserPins: { ...state.currentUserPins },
                currentProfilePins: { ...state.currentProfilePins }
            }
        case GET_PINS_OF_BOARD:
            return {
                ...state,
                pins: { ...state.pins },
                singlePin: { ...state.singlePin },
                currentBoardPins: action.pins,
                currentUserPins: { ...state.currentUserPins },
                currentProfilePins: { ...state.currentProfilePins }
            }
        case GET_OTHER_USER_PINS:
            return {
                ...state,
                pins: { ...state.pins },
                singlePin: { ...state.singlePin },
                currentBoardPins: { ...state.currentBoardPins },
                currentUserPins: { ...state.currentUserPins },
                currentProfilePins: action.pins
            }
        case GET_CURRENT_USER_PINS:
            return {
                ...state,
                pins: { ...state.pins },
                singlePin: { ...state.singlePin },
                currentBoardPins: { ...state.currentBoardPins },
                currentUserPins: action.pins,
                currentProfilePins: { ...state.currentProfilePins }
            }
        case GET_PIN:
            return {
                ...state,
                pins: { ...state.pins },
                singlePin: { ...action.pin },
                currentBoardPins: { ...state.currentBoardPins },
                currentUserPins: { ...state.currentUserPins },
                currentProfilePins: { ...state.currentProfilePins }
            }
        case CREATE_PIN:
            return {
                ...state,
                pins: { ...state.pins, [action.pin.id]: action.pin },
                currentBoardPins: { ...state.currentBoardPins },
                currentUserPins: { ...state.currentUserPins, [action.pin.id]: action.pin },
                currentProfilePins: { ...state.currentProfilePins }
            }
        case GET_ALL_PINS:
            return { ...state, pins: { ...action.pins } }
        case DELETE_PIN:
            let newState3 = {
                ...state,
                pins: { ...state.pins },
                singlePin: {},
                currentBoardPins: { ...state.currentBoardPins },
                currentUserPins: { ...state.currentUserPins },
                currentProfilePins: { ...state.currentProfilePins },
                // currentUserBoardPins: {...state.currentUserBoardPins}
            }

            delete newState3.pins[action.pinId]
            delete newState3.currentUserPins[action.pinId]

            if (newState3.currentBoardPins[action.pinId]) {
                delete newState3.currentBoardPins[action.pinId]
            }
            for (let board in newState3.currentUserBoardPins) {
                if (board[action.pinId]) {
                    delete board[action.pinId]
                }
            }
            return newState3
        case UPDATE_USER_PIN:
            return {
                ...state,
                pins: { ...state.pins, [action.pin.id]: action.pin },
                singlePin: action.pin,
                currentBoardPins: { ...state.currentBoardPins },
                currentUserPins: { ...state.currentUserPins, [action.pin.id]: action.pin },
                currentProfilePins: { ...state.currentProfilePins }
            }
        case CLEAR_SINGLE_PIN:
            return { ...state, singlePin: {} }
        default:
            return state
    }
}















































































// case GET_PINS_MADE_TODAY:
//     return { ...state, allBoards: { ...state.allPins }, todayPins: { ...action.pins } }
// const getPinsToday = (pins) => ({
//     type: GET_PINS_MADE_TODAY,
//     pins
// })
// export const fetchPinsToday = () => async (dispatch) => {
//     const res = await fetch(`/api/pins/today`, {
//         method: 'GET'
//     })
//     if (res.ok) {
//         let pinsToday = await res.json()
//         dispatch(getPinsToday(pinsToday))
//     } else {
//         const errors = await res.json()
//         return errors
//     }
// }










































































// case GET_PINS_MADE_TODAY:
//     return { ...state, allBoards: { ...state.allPins }, todayPins: { ...action.pins } }
// const getPinsToday = (pins) => ({
//     type: GET_PINS_MADE_TODAY,
//     pins
// })
// export const fetchPinsToday = () => async (dispatch) => {
//     const res = await fetch(`/api/pins/today`, {
//         method: 'GET'
//     })
//     if (res.ok) {
//         let pinsToday = await res.json()
//         dispatch(getPinsToday(pinsToday))
//     } else {
//         const errors = await res.json()
//         return errors
//     }
// }
