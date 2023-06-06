const CREATE_PIN = "pins/createNewPin"
const GET_PIN = "pins/getById"

const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})

const getPin = (pin) => ({
    type: GET_PIN,
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

export const getPinById = (pin_id) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pin_id}`)

    if (res.ok) {
        const pin = await res.json()
        return dispatch(getPin(pin))
    }

}

const initialState = {pins: {}, singlePin: {}}

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PIN:
            return {...state, pins: {...state.pins}, singlePin: {...action.pin}}
        case CREATE_PIN:
            return {...state, pins: {...state.pins, ...action.pin}}
        default:
            return state
    }
}