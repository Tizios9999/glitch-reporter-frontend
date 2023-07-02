export function authReducer(state, action) {
    const { type, payload } = action;
  
    switch (type) {
      case "LOAD_LOCALSTORAGE":
        return {
            ...state,
            user: payload.user,
            isLoggedIn: payload.isLoggedIn,
            loading: false,
        }
      case "REGISTER_SUCCESS":
        return {
          ...state,
          isLoggedIn: false,
        };
      case "REGISTER_FAIL":
        return {
          ...state,
          isLoggedIn: false,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case "LOGIN_FAIL":
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case "LOGOUT":
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };

      case "SET_MESSAGE":
        return {
            ...state,
            message: payload,
        };

      case "CLEAR_MESSAGE":
        return {
            ...state,
            message: "",
        };      

      default:
        return state;
    }
  }