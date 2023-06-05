const GET_PROFILE = "users/GET_USER"
const CLEAR_PROFILE = "users/CLEAR_PROFILE"

const getUser = (user) => ({
    type: GET_PROFILE,
    user
})

export const clearProfile = () => ({
    type: GET_PROFILE
})

export const getUserInfo = (username) => async (dispatch) => {
    const res = await fetch(`/api/users/users/${username}`)
    console.log(res.status)
    if (res.ok) {
        const userData = await res.json()
        if (userData.errors){
            return userData.errors
        }
        dispatch(getUser(userData))
    }
    else {
        const userDataErrors = await res.json()
        return userDataErrors
    }
}

const initialState = {currentProfile: {}}

export default function profileReducer(state = initialState, action){
    switch (action.type) {
        case GET_PROFILE:
            return {currentProfile: action.user}
        case GET_PROFILE:
            return {currentProfile: {}}
        default:
            return state
    }
}