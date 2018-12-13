import {
  FL_UPDATE_FILTER,
  FL_RESET,
} from './constants';


const defaultState = {
  area: 0, // 650,
  rent: 0, // 15000,
  withPhotos: false,
  sortDescending: true,
};

export const Filters = (state = defaultState, action) => {
  switch (action.type) {
    case FL_UPDATE_FILTER:
      // console.log('test:::', action);
      const filters = {};
      Object.keys(action.payload).forEach(key => filters[key] = action.payload[key])
      return {
        ...state,
        ...filters,
      };
    case FL_RESET:
      return {
        ...defaultState,
        sortDescending: state.sortDescending,
      };
    default:
      return state
  }
};
