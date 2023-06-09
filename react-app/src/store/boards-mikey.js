

const GET_ALL_BOARDS = '/boards'
const GET_BOARD_DETAILS = '/boards/:boardId'
const CREATE_BOARD = '/boards/new'
const UPDATE_BOARD = '/boards/edit'
const DELETE_BOARD = '/boards/delete'
const ADD_BOARD_IMAGE = '/boards/image'
const UPDATE_BOARD_IMAGE = '/boards/image/edit'
const GET_ALL_PINS_ASSOCIATED = '/boards/:boardId/pins'



//BOARD ACTION CREATORS

const getBoards = (list) => {
  return {
    type: GET_ALL_BOARDS,
    list
  }
}

const getBoardDetails = (board) => {
  return {
    type: GET_BOARD_DETAILS,
    board
  }
}

const createBoard = (board) => {
  return {
    type: CREATE_BOARD,
    board
  }
}

const updateBoard = (board) => {
  return {
    type: UPDATE_BOARD,
    board
  }
}

const deleteBoard = (boardId) => {
  return {
    type: DELETE_BOARD,
    boardId: boardId
  }
}

const addBoardImage = (image) => {
  return {
    type: ADD_BOARD_IMAGE,
    image
  }
}

const updateBoardImage = (image) => {
  return {
    type: UPDATE_BOARD_IMAGE,
    image
  }
}



//BOARD THUNKS

export const getAllBoardThunks = () => async (dispatch) => {
  const response = await fetch('/api/boards')

  if (response.ok) {
    const boards = await response.json()
    dispatch(getBoards(boards))
    return boards
  }
  else {
  }
}





const initialState = {
  allBoards: {},
  singleBoard: {},
}


const boardReducer = (state = initialState, action) => {
  let newState = {}

  switch (action.type) {
    case GET_ALL_BOARDS:
      newState = { ...state, allBoards: {}, singleBoard: {} }
      newState.allBoards = action.list
      return newState




    default:
      return state
  }
}

export default boardReducer
