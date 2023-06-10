// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UNFOLLOW_USER = "session/UNFOLLOW_USER"
const FOLLOW_USER = "session/FOLLOW_USER"
const SET_USER_CATEGORIES = "session/POST_CATEGORIES"


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



export const createUserCategories = (categories) => async (dispatch) => {
	console.log("categories in thunk", categories)
	let res = await fetch("/api/users/categories", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ categories: categories })
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
		case SET_USER_CATEGORIES:
			console.log("action.categories", action.categories)
			let user = {...state.user}
			user.categories = action.categories
			return { ...state, user: { ...user } }

		case FOLLOW_USER:
			let newState = { ...state }
			console.log("state", state)
			console.log(action.user)
			// newState.following[action.user]
			// following.push(action.user)
			// newState.user.following = following

			console.log("FOLLOWING USER REDUCER")
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
			state.user.following.splice(i, 1)
			return { user: { ...state.user } }
		default:
			return state;
	}
}
