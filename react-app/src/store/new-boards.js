const NEW_GET_ALL_BOARDS = "boards/all";
const NEW_CREATE_USER_BOARD = 'boards/new';
const NEW_UPDATE_USER_BOARD = 'boards/edit';
const NEW_DELETE_USER_BOARD = "boards/delete";
const NEW_UN_PIN = "boards/unpin";
const NEW_PIN = "boards/pin";
const NEW_REPIN = "boards/repin";







const newGetAllBoards = (boards) => ({
  type: NEW_GET_ALL_BOARDS,
  boards: boards
});

const newCreateUserBoard = (board) => ({
  type: NEW_CREATE_USER_BOARD,
  board
});

const newUpdateUserBoard = (board) => ({
  type: NEW_UPDATE_USER_BOARD,
  board
});

const newDeleteUserBoard = (id) => ({
  type: NEW_DELETE_USER_BOARD,
  id,
});

const newUnPin = (pin, boardId) => ({
  type: NEW_UN_PIN,
  pin,
  boardId,
});

const newRePin = (pin, oldBoardId, newBoardId) => ({
  type: NEW_REPIN,
  pin,
  oldBoardId,
  newBoardId
});

const newPinBoard = (pin, boardId) => ({
  type: NEW_PIN,
  pin,
  boardId,
});


export const newGetAllBoardsThunk = () => async (dispatch) => {
    const res = await fetch("/api/boards/").catch((e) => console.log("ALL BOARDS"))
    if (res.status >= 400) {
        console.log("in the get all boards of all boards reducer")
        return
    }
    if (res.ok) {
        let boards = await res.json()
        console.log("all boards", boards)
        dispatch(newGetAllBoards(boards))
        return
    }
}









export const newCreateBoardThunk = (board) => async (dispatch) => {
    const res = await fetch('/api/boards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    })

    if (res.ok) {
        const new_board = await res.json()
        dispatch(newCreateUserBoard(new_board))
        return new_board
    }
    else {
        return ("Error response:", res)
    }
}


export const newUpdateBoardThunk = (board, id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        });
        if (res.ok) {
            const updated_board = await res.json();
            dispatch(newUpdateUserBoard(updated_board));
            return updated_board;
        } else {
            throw new Error("Update board request failed");
        }
    } catch (error) {
        console.error("Error occurred during updateBoardThunk:", error);
        return null; // or handle the error in an appropriate way
    }
};



export const newDeleteBoardThunk = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${id}/delete`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = res.json()
            dispatch(newDeleteUserBoard(id));
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

export const newUnpinThunk = (pin, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/unpin/${pin.id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(newUnPin(pin, boardId));
        return pin
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const newPinThunk = (pin, boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/pin/${pin.id}`, {
        method: "POST",
    });
    if (res.ok) {
        dispatch(newPinBoard(pin, boardId));
        return pin
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const newRepinThunk = (pin, oldBoardId, newBoardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${oldBoardId}/${pin.id}/pin_to/${newBoardId}`, {
        method: "POST",
    });
    if (res.ok) {
        dispatch(newRePin(pin, oldBoardId, newBoardId));
        return pin
    } else {
        const errors = await res.json();
        return errors;
    }
}




const initialState = { newAllBoards: {} }

export default function boardsReducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case NEW_GET_ALL_BOARDS:
      return { ...state, newAllBoards: { ...action.boards } };

    case NEW_CREATE_USER_BOARD:
      return {
        ...state,
        newAllBoards: {
          ...state.newAllBoards,
          [action.board.id]: action.board
        }
      };

    case NEW_DELETE_USER_BOARD:
      const newAllBoards = { ...state.newAllBoards };
      delete newAllBoards[action.id];
      return {
        ...state,
        newAllBoards: newAllBoards,
      };

    case NEW_UPDATE_USER_BOARD:
      newState = {
        ...state,
        newAllBoards: {
          ...state.newAllBoards,
          [action.board.id]: action.board
        }
      };
      return newState;

    case NEW_UN_PIN:
      const unPinAllBoards = { ...state.newAllBoards };
      return { ...state, newAllBoards: unPinAllBoards };

    case NEW_PIN:
      const pinAllBoards = { ...state.newAllBoards };
      return { ...state, newAllBoards: pinAllBoards };

    case NEW_REPIN:
      const repinAllBoards = { ...state.newAllBoards };
      return { ...state, newAllBoards: repinAllBoards };

    default:
      return state;
  }
}




// case UN_PIN:
//             const unPinAllBoards = { ...state.allBoards }
//             // if (typeof unPinSingle === 'object') {
//             //     if (action.pin.id.toString() in unPinSingle.pinInfo) {
//             //         delete unPinSingle.pinInfo[action.pin.id.toString()]
//             //     }
//             // }
//             return { ...state, allBoards: unPinAllBoards }

//         case PIN:
//             const pinAllBoards = { ...state.allBoards }

//             // if (typeof pinSingle === 'object') {
//             //     if ("pinInfo" in pinSingle)
//             //         pinSingle.pinInfo[action.pin.id.toString()] = action.pin;
//             // }
//             return { ...state, allBoards: pinAllBoards }
