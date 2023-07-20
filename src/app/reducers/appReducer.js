export function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_METADATA":
      return {
        ...state,
        metadata: payload.data.data,
        loading: false,
      };

    case "UPDATE_FILTERS":
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [payload.name]: payload.values,
        },
      };

    default:
      return state;
  }
}
