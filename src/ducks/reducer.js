const initialState = {
  loggedIn: false
};

const UPDATE_LOGGEDIN = "UPDATE_LOGGEDIN";

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGGEDIN:
      return Object.assign({}, state, { loggedIn: action.payload });

    default:
      return state;
  }
}

export function updateLoggedIn(logged) {
  return {
    type: UPDATE_LOGGEDIN,
    payload: logged
  };
}

export default reducer;
