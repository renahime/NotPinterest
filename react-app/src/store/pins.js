const CREATE_PIN = "pins/createNewPin"
const GET_PIN = "pins/getById"
const GET_PINS_MADE_TODAY = "pins/getPinsToday"

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

const initialState = {pins: {}, singlePin: {}, todayPins: {} }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PINS_MADE_TODAY:
            return { ...state, allBoards: { ...state.allPins }, todayPins: { ...action.pins } }
        case GET_PIN:
            return {...state, pins: {...state.pins}, singlePin: {...action.pin}}
        case CREATE_PIN:
            return { ...state, pins: { ...state.pins, ...action.pin } }
        default:
            return state
    }
}















































































