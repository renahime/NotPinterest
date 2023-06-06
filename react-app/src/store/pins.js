const CREATE_PIN = "pins/createNewPin"

const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})

export const createNewPin = (pin_info) => async (dispatch) => {
    console.log("pin_info", pin_info)
    const res = await fetch("/api/pins/new", {
        method: "POST",
        body: pin_info
    })

    if (res.ok) {
        const new_pin = await res.json()
        return dispatch(createPin(new_pin))
    } else {
        const errors = await res.json()
        console.log("errors")
        return errors
    }
}

const initialState = {pins: {}}

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PIN:
            return {...state, pins: {...state.pins, ...action.pin}}
        default:
            return state
    }
}