/**

Reducer used by AppContext.

*/

export function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_METADATA":
      return {
        ...state,
        metadata: payload.data.data,
        loading: false,
        activeFilters: {
          ...state.activeFilters,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: payload,
        activeFilters: {
          ...state.activeFilters,
        },
      };

    case "SET_ROUTE_LOADING":
      return {
        ...state,
        routeLoading: payload,
        activeFilters: {
          ...state.activeFilters,
        },
      };

    case "UPDATE_FILTERS":
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [payload.name]: payload.values,
        },
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        activeFilters: {
          priority: [],
          status: [],
        },
      };

    case "SET_MESSAGE":
      return {
        ...state,
        message: payload,
        activeFilters: {
          ...state.activeFilters,
        },
      };

    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: "",
        activeFilters: {
          ...state.activeFilters,
        },
      };

    default:
      return state;
  }
}
