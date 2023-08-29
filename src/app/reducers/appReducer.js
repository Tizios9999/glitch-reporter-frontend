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

    default:
      return state;
  }
}
