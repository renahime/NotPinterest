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




const deletePin = (pinId) => ({
    type: DELETE_PIN,
    pinId
})

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

const initialState = { allPins: {}, singlePin: {} }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PIN:
            return { ...state, pins: { ...state.pins }, singlePin: { ...action.pin } }
        case CREATE_PIN:
            return { ...state, pins: { ...state.pins, ...action.pin } }
        case GET_ALL_PINS:
            return { ...state, allPins: { ...action.pins } }
        case DELETE_PIN:
            const newPins = { ...state.pins };
            delete newPins[action.id];
            if (state.singlePin.id == action.id) {
                state.singlePin = {}
            }
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
