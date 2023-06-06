const CREATE_PIN = "pins/createNewPin"
const GET_PINS_MADE_TODAY = "pins/getPinsToday"

const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})

const getPinsToday = (pins) => ({
    type: GET_PINS_MADE_TODAY,
    pins
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


export const fetchPinsToday = () => async (dispatch) => {
    const res = await fetch(`/api/pins/today`, {
        method: 'GET'
    })
    if (res.ok) {
        let pinsToday = await res.json()
        dispatch(getPinsToday(pinsToday))
    }
}

const initialState = { allPins: {}, todayPins: {} }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PIN:
            return { ...state, pins: { ...state.pins, ...action.pin } }
        case GET_PINS_MADE_TODAY:
            return { ...state, allBoards: { ...state.allPins }, todayPins: { ...action.pins } }
        default:
            return state
    }
}
