const CREATE_PIN = "pins/createNewPin"
const GET_PIN = "pins/getById"
const GET_PINS_MADE_TODAY = "pins/getPinsToday"
const GET_PINS_BY_CATEGORY = "pins/getPinsByCategory"
const GET_PINS_BY_USERNAME = "pins/getPinsByUsername"
const DELETE_PIN = "pins/delete"
const UPDATE_USER_PIN = "pins/edit"


const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})

const getPin = (pin) => ({
    type: GET_PIN,
    pin
})

const getPinsToday = (pins) => ({
    type: GET_PINS_MADE_TODAY,
    pins
})

const pinsByCategory = (pins) => ({
    type: GET_PINS_BY_CATEGORY,
    pins
})

const getUserPins = (pins) => ({
    type: GET_PINS_BY_USERNAME,
    pins
})

const deletePin = (pinId) => ({
    type: DELETE_PIN,
    pinId
})


export const getPinsByUsername = (username) => async (dispatch) => {
    let res = await fetch(`/api/pins/users/${username}`)
    if (res.ok) {
        let pins = await res.json()
        dispatch(getUserPins(pins))
    } else {
        let errors = res.json()
        return errors
    }
}


const updateUserPin = (pin) => ({
    type: UPDATE_USER_PIN,
    pin
})

export const createNewPin = (pin_info) => async (dispatch) => {
    const res = await fetch("/api/pins/new", {
        method: "POST",
        body: pin_info
    })

    if (res.ok) {
        const new_pin = await res.json()
        return dispatch(createPin(new_pin))
    } else {
        const errors = await res.json()
        return errors
    }
}


export const fetchPinsToday = () => async (dispatch) => {
    const res = await fetch(`/api/pins/today`, {
        method: 'GET'
    })
    if (res.ok) {
        let pinsToday = await res.json()
        dispatch(getPinsToday(pinsToday))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getPinsByCategory = () => async (dispatch) => {
    const res = await fetch(`/api/pins/categories`)
    if (res.ok) {
        let pins = await res.json()
        dispatch(pinsByCategory(pins))
        return pins
    } else {
        let errors = await res.json()
        return errors
    }
}

export const deletePinThunk = (pinId) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pinId}/delete`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deletePin(pinId));
        return pinId
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const getPinById = (pin_id) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pin_id}`)

    if (res.ok) {
        const pin = await res.json()
        return dispatch(getPin(pin))
    }

}


export const updatePinThunk = (pin) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pins/${pin.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pin)
        });
        if (res.ok) {
            const updatedPin = await res.json();
            dispatch(updateUserPin(updatedPin));
            return updatedPin;
        } else {
            throw new Error("Update board request failed");
        }
    } catch (error) {
        console.error("Error occurred during updateBoardThunk:", error);
        return null; // or handle the error in an appropriate way
    }
};


const initialState = { pins: {}, singlePin: {}, todayPins: {}, userPins: {} }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PINS_BY_USERNAME:
            return { ...state, singlePin: { ...state.singlePin }, todayPins: { ...state.todayPins }, pins: { ...action.pins }, userPins: { ...action.pins } }
        case GET_PINS_BY_CATEGORY:
            return { ...state, singlePin: { ...state.singlePin }, pins: { ...action.pins }, todayPins: { ...state.todayPins } }
        case GET_PINS_MADE_TODAY:
            return { ...state, allBoards: { ...state.allPins }, todayPins: { ...action.pins } }
        case GET_PIN:
            return { ...state, pins: { ...state.pins }, singlePin: { ...action.pin } }
        case CREATE_PIN:
            return { ...state, pins: { ...state.pins, ...action.pin } }
        case GET_PINS_MADE_TODAY:
            return { ...state, pins: { ...state.pins }, todayPins: { ...action.pins } }
        case DELETE_PIN:
            const newPins = { ...state.pins };
            const updatedTodayPins = { ...state.todayPins };
            delete newPins[action.id];
            if (updatedTodayPins[action.id]) {
                delete updatedTodayPins[action.id]
            }
            return {
                ...state,
                pins: newPins,
                todayPins: updatedTodayPins,
            };
        case UPDATE_USER_PIN:
            const updatedPins = { ...state.pins, [action.pin.id]: action.pin };
            const checkTodayPins = { ...state.todayPins };
            if (checkTodayPins[action.id]) {
                checkTodayPins[action.id] = action.pin
            }
            return { ...state, pins: updatedPins, todayPins: checkTodayPins }
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
