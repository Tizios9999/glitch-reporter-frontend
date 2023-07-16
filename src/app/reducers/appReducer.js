export function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_METADATA":
      return {
        ...state,
        metadata: payload.data.data,
        loading: false,
      };

    default:
      return state;
  }
}
