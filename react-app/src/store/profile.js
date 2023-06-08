const GET_PROFILE = "users/GET_USER"
const CLEAR_PROFILE = "users/CLEAR_PROFILE"

const getUser = (user) => ({
    type: GET_PROFILE,
    user
})

export const clearProfile = () => ({
    type: CLEAR_PROFILE
})

export const getUserInfo = (username) => async (dispatch) => {
    const res = await fetch(`/api/users/users/${username}`)
    console.log(res.status)
    if (res.status >= 400) {
        console.log("umm no")
        const userDataErrors = await res.json()
        return {errors : userDataErrors}
    }
    else {
        console.log("like whatttt")
        const userData = await res.json()
        if (userData.errors){
            return userData.errors
        }
        return dispatch(getUser(userData))
    }
}

const initialState = {currentProfile: {}}

export default function profileReducer(state = initialState, action){
    switch (action.type) {
        case GET_PROFILE:
            return {currentProfile: action.user}
        case CLEAR_PROFILE:
            return {currentProfile: {}}
        default:
            return state
    }
}