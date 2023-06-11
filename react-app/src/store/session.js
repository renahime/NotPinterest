// constants
//



const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UNFOLLOW_USER = "session/UNFOLLOW_USER"
const FOLLOW_USER = "session/FOLLOW_USER"
const SET_USER_CATEGORIES = "session/POST_CATEGORIES"
const CREATE_USER_BOARD_FROM_PIN = 'boards/new'
const EDIT_USER = "users/EDIT_USER"
const DELETE_PROFILE = "users/DELETE_PROFILE"
const DELETE_SESSION_BOARD = "boards/delete/session"






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


const createUserBoard = (board) => ({
	type: CREATE_USER_BOARD_FROM_PIN,
	board
})

const deleteSessionBoard = (id) => ({
	type: DELETE_SESSION_BOARD,
	id,
});

// const getFollowing = (users) => ({
// 	type: GET_FOLLOWERS,
// 	users
// })


export const deleteBoardSessionThunk = (id) => async (dispatch) => {
	try {
			const res = await fetch(`/api/boards/${id}/delete`, {
					method: "DELETE",
			});
			if (res.ok) {
					const data = res.json()
					dispatch(deleteSessionBoard(id));
					return data;
			}
			else {
					throw new Error("Delete board request failed");
			}
	} catch (error) {
			console.error("Error occurred during deleteBoardThunk:", error);
			return false;
	}
};


export const editProfileThunk = (user) => async (dispatch) => {
	const res = await fetch(`/api/users/${user.id}`, {
		method: "PUT",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	});
	if (res.ok) {
		const userData = await res.json()
		if (userData.errors) {
			return userData.errors
		}
		dispatch(editUser(userData))
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

export const createBoardFromPinPage = (board) => async (dispatch) => {
	const res = await fetch('/api/boards/', {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(board)
	})

	if (res.ok) {
		const new_board = await res.json()
		dispatch(createUserBoard(new_board))
		return new_board
	}
	else {
		return ("Error response:", res)
	}
}

export const createUserCategories = (categories) => async (dispatch) => {
	console.log("categories", categories)
	let res = await fetch("/api/users/categories", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(categories)

	})
	console.log("res", res)
	if (res.ok) {
		let categories = await res.json()
		dispatch(setCategories(categories))
		return categories
	} else {
		return { errors: "Could not set category" }
	}
}

// export const findFollowersAndFollowing = (username) => async (dispatch) => {
// 	let res = await fetch(`/api/users/${username}/followers_and_following`)
// 	if (res.ok) {
// 		let followRel = await res.json()
// 		dispatch(getFollowersAndFollowing(followRel))
// 		return followRel
// 	}
// 	else {
// 		let errors = await res.json()
// 		return errors
// 	}
// }

// export const findFollowing = (username) => async (dispatch) => {
// 	let res = await fetch(`/api/users/${username}/following`)
// 	if (res.ok) {
// 		let following = await res.json()
// 		dispatch(getFollowing(following))
// 		return following
// 	}
// 	else {
// 		let errors = await res.json()
// 		return errors
// 	}
// }


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

const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState = {}
	switch (action.type) {
		case CREATE_USER_BOARD_FROM_PIN:
			let newSate2 = { ...state, user: { ...state.user, ...state.user.boards.push(action.board) } }
			console.log("newSate2", newSate2)
			return newSate2
		case SET_USER_CATEGORIES:
			let user = { ...state.user }
			user.categories = action.categories
			return { ...state, user: { ...user }, following: {}, followers: {} }

		case FOLLOW_USER:
			let newState = { ...state }
			return newState
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UNFOLLOW_USER:
			let unfollowed = action.user
			let i = state.user.following.indexOf(unfollowed)
			console.log("state.user.following", state.user.following)
			console.log("state.user", state.user)
			state.user.following.slice(i, 1)
			return { user: { ...state.user } }
		case EDIT_USER:
			return { currentProfile: action.user };
		case DELETE_PROFILE:
			return { currentProfile: {} }

		case DELETE_SESSION_BOARD:
			let userStateBeforeBoardDelete = {...state, user: {...state.user}}
			let userBoardstoDeleteArr = userStateBeforeBoardDelete.user.boards
			// console.log("WE ARE IN BOARDS UPDATE REDUCER",currentProfileBoardsArr)
			let userBoardData;
			let userBoardIndex;
			console.log("USER/SESSION BOARDS TO ELETE ARR",userBoardstoDeleteArr)
			for (let i = 0; i < userBoardstoDeleteArr.length; i++) {
					console.log("ID",userBoardstoDeleteArr[i].id)
					console.log(action.id)
					if (userBoardstoDeleteArr[i].id === action.id) {
							// console.log("NEW BOARD", currentProfileBoardsArr[i])
							userBoardData = userBoardstoDeleteArr[i]
							userBoardIndex = i
							// console.log("WE ARE IN UPDATE PROFILE REDUCER THUNK", oldBoardData)
							break
					}
			}
			if (userBoardIndex !== undefined && userBoardData) {
					// currentProfileBoardsArr[oldBoardIndex] = action.board
					console.log("SESSION BOARD TO DELETE", userBoardData)
					delete userStateBeforeBoardDelete.user.boards[userBoardIndex]
			}

			// console.log("BOARD TO DELETE", BoardData)
			return userStateBeforeBoardDelete


		default:
			return state;
	}
}
