const CREATE_PIN = "pins/createNewPin"
const GET_PIN = "pins/getById"
const GET_PINS_MADE_TODAY = "pins/getPinsToday"
const GET_PINS_BY_CATEGORY = "pins/getPinsByCategory"
const GET_PINS_BY_USERNAME = "pins/getPinsByUsername"

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

export const createNewPin = (pinData) => async (dispatch) => {
    const res = await fetch("/api/pins/new", {
        method: "POST",
        body: pinData
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

// export const getPinsByCategory = (category) => async (dispatch) => {
//     const res = await fetch(`/api/pins/${category}`)
//     if (res.ok) {
//         let pins = await res.json()
//         dispatch(getPinsByCategory)
//         return pins
//     }
// }

const initialState = {pins: {}, singlePin: {}, todayPins: {}, categories: {}, userPins: {} }

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PINS_BY_USERNAME:
            return {...state, singlePin: {...state.singlePin}, todayPins: {...state.todayPins}, categories: {...state.categories}, pins: {...state.pins}, userPins: {...action.pins}}
        case GET_PINS_BY_CATEGORY:
            return {...state, singlePin: {... state.singlePin}, pins: {...state.pins}, todayPins : {...state.todayPins}, categories: {...action.pins}}
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















































































