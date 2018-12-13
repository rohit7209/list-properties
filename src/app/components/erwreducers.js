
const defaultState = {
  test: 'test test',
};

export const AppReducer1 = (state = defaultState, action) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        newTest: 'new test',
      };
    case 'TEST_DONE':
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state
  }
};
