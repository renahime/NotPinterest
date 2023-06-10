const GET_ALL_PINS = "pins/all"
const CREATE_PIN = "pins/createNewPin"
const DELETE_PIN = "pins/delete"
const UPDATE_USER_PIN = "pins/edit"



const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})

const getAllPins = (pins) => ({
    type: GET_ALL_PINS,
    pins
})


const deletePin = (pinId) => ({
    type: DELETE_PIN,
    pinId
})

const updateUserPin = (pin) => ({
    type: UPDATE_USER_PIN,
    pin
})



export const getAllPinsThunk = (pins) => async (dispatch) => {
    let res = await fetch(`/api/pins/`)
    if (res.ok) {
        let pins = await res.json()
        dispatch(getAllPins(pins))
    } else {
        let errors = res.json()
        return errors
    }
}


export const createNewPin = (pin) => async (dispatch) => {
    const res = await fetch("/api/pins/new", {
        method: "POST",
        body: pin
    })

    if (res.ok) {
        const new_pin = await res.json()
        return dispatch(createPin(new_pin))
    } else {
        const errors = await res.json()
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
            throw new Error("Update pin request failed");
        }
    } catch (error) {
        console.error("Error occurred during updatePinhunk:", error);
        return null;
    }
};


const initialState = { pins: {} }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_PINS:
            console.log("pins in thunk", action.pins )
            return { ...state, pins: { ...action.pins } }
        case CREATE_PIN:
            return { ...state, pins: { ...state.pins, [action.pin.id]: action.pin } }
        case DELETE_PIN:
            const newPins = { ...state.pins };
            delete newPins[action.id];
            return {
                ...state,
                pins: newPins,
            };
        case UPDATE_USER_PIN:
            const updatedPins = { ...state.pins, [action.pin.id]: action.pin };
            return { ...state, pins: updatedPins }
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
