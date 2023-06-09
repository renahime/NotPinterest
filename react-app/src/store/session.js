// constants
//
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UNFOLLOW_USER = "session/UNFOLLOW_USER"
const FOLLOW_USER = "session/FOLLOW_USER"
const SET_USER_CATEGORIES = "session/POST_CATEGORIES"
const EDIT_USER = "users/EDIT_USER"
const DELETE_PROFILE = "users/DELETE_PROFILE"
const GET_PROFILE = "users/GET_USER"
const CLEAR_PROFILE = "users/clearProfile"


export const editUser = (user) => ({
	type: EDIT_USER,
	user
})

export const deleteProfile = (user) => ({
	type: DELETE_PROFILE,
	user
})

const setCategories = (categories) => ({
	type: SET_USER_CATEGORIES,
	categories
})

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const removeFollowing = (user) => ({
	type: UNFOLLOW_USER,
	user
})

const newFollow = (user) => ({
	type: FOLLOW_USER,
	user
})

const getUser = (user) => ({
    type: GET_PROFILE,
    user
})

export const clearProfile = () => ({
	type: CLEAR_PROFILE
})

export const getUserInfo = (username) => async (dispatch) => {
    const res = await fetch(`/api/users/users/${username}`)
    if (res.status >= 400) {
        const userDataErrors = await res.json()
        return { errors: userDataErrors }
    }
    else {
        const userData = await res.json()
        if (userData.errors) {
            return userData.errors
        }
        return dispatch(getUser(userData))
    }
}

export const editProfileThunk = (user, data) => async (dispatch) => {
	const res = await fetch(`/api/users/${user.id}`, {
		method: "PUT",
		body: data
	});
	if (res.ok) {
		const userData = await res.json()
		if (userData.errors) {
			return userData.errors
		}
		dispatch(editUser(userData))
		return userData
	}
}

export const deleteProfileThunk = (user) => async (dispatch) => {
	const res = await fetch(`/api/users/${user.id}`, {
		method: "DELETE",
		headers: { 'Content-Type': 'application/json' }
	});
	if (res.ok) {
		const userData = await res.json()
		if (userData.errors) {
			return userData.errors
		}
		dispatch(deleteProfile(userData))
	}
}

export const createUserCategories = (categories) => async (dispatch) => {
	let res = await fetch("/api/users/categories", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(categories)

	})
	if (res.ok) {
		let categories = await res.json()
		dispatch(setCategories(categories))
		return categories
	} else {
		return { errors: "Could not set category" }
	}
}

export const followUser = (username) => async (dispatch) => {
	const res = await fetch(`/api/users/follow/${username}`, {
		method: "POST"
	})
	if (res.ok) {
		dispatch(newFollow(username))
		let response = res.json()
		return response
	} else {
		let errors = res.json()
		return errors
	}
}

export const unfollowUser = (username) => async (dispatch) => {
	const res = await fetch(`/api/users/unfollow/${username}`, {
		method: "DELETE"
	})
	if (res.ok) {
		dispatch(removeFollowing(username))
		let response = res.json()
		return response
	} else {
		let errors = res.json()
		return errors
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
		return {message : "Successful setting"}
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = { user: null, currentProfile: {} };

export default function reducer(state = initialState, action) {
	let newState = {}
	switch (action.type) {
		case CLEAR_PROFILE:
			return { ...state, user: {...state.user}, currentProfile: {} }
		case GET_PROFILE:
            return { ...state, user: {...state.user}, currentProfile: action.user }
		case SET_USER_CATEGORIES:
			let user = { ...state.user }
			user.categories = action.categories
			return { ...state, user: { ...user }, following: {}, followers: {} }
		case FOLLOW_USER:
			let newState = { ...state, 
				user: { ...state.user, 
					following: [...state.user.following, action.user] },
				currentProfile: {...state.currentProfile, 
					followers: [...state.user.followers, action.user]}}
			return newState
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UNFOLLOW_USER:
			let newState3 = { ...state, 
				user: { ...state.user }, 
				currentProfile: {...state.currentProfile} 
			}
			let i = newState3.user.following.indexOf(action.user)
			newState3.user.following.splice(i, 1)
			let index = newState3.currentProfile.followers.indexOf(newState3.user.username)
			newState3.currentProfile.followers.splice(index, 1)
			return newState3
		case EDIT_USER:
			let newState1 = { ...state }
			newState1.user = action.user
			return newState1;
		case DELETE_PROFILE:
			return { currentProfile: {} }
		// case UPDATE_USER_BOARD:
		// 	let oldBoardState = { ...state }
		// 	let currentProfileBoardsArr = oldBoardState.user.boards
		// 	let oldBoardData;
		// 	let oldBoardIndex;
		// 	for (let i = 0; i < currentProfileBoardsArr.length; i++) {
		// 		console.log(currentProfileBoardsArr[i].id)
		// 		console.log(action.board.id)
		// 		if (currentProfileBoardsArr[i].id === action.board.id) {
		// 			// console.log("NEW BOARD", currentProfileBoardsArr[i])
		// 			oldBoardData = currentProfileBoardsArr[i]
		// 			oldBoardIndex = i
		// 			// console.log("WE ARE IN UPDATE PROFILE REDUCER THUNK", oldBoardData)
		// 			break
		// 		}
		// 	}
		// 	if (oldBoardIndex !== undefined && oldBoardData) {
		// 		currentProfileBoardsArr[oldBoardIndex] = action.board
		// 	}
		// 	// console.log("NEW BOARD DATA in reducer", oldBoardData)

		// 	return { ...state, user: { ...oldBoardState.user, boards: currentProfileBoardsArr } }
		// case DELETE_SESSION_BOARD:
		// 	let userStateBeforeBoardDelete = { ...state, user: { ...state.user } }
		// 	let userBoardstoDeleteArr = userStateBeforeBoardDelete.user.boards
		// 	// console.log("WE ARE IN BOARDS UPDATE REDUCER",currentProfileBoardsArr)
		// 	let userBoardData;
		// 	let userBoardIndex;
		// 	for (let i = 0; i < userBoardstoDeleteArr.length; i++) {
		// 		console.log("ID", userBoardstoDeleteArr[i].id)
		// 		console.log(action.id)
		// 		if (userBoardstoDeleteArr[i].id === action.id) {
		// 			// console.log("NEW BOARD", currentProfileBoardsArr[i])
		// 			userBoardData = userBoardstoDeleteArr[i]
		// 			userBoardIndex = i
		// 			// console.log("WE ARE IN UPDATE PROFILE REDUCER THUNK", oldBoardData)
		// 			break
		// 		}
		// 	}
		// 	if (userBoardIndex !== undefined && userBoardData) {
		// 		// currentProfileBoardsArr[oldBoardIndex] = action.board
		// 		console.log("SESSION BOARD TO DELETE", userBoardData)
		// 		delete userStateBeforeBoardDelete.user.boards[userBoardIndex]
		// 	}

		// 	// console.log("BOARD TO DELETE", BoardData)
		// 	return userStateBeforeBoardDelete
		default:
			return state;
	}
}
