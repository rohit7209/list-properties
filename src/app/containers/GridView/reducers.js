import {
  GV_REQUEST_NEXT_PROPERTIES,
  GV_REQUEST_NEXT_PROPERTIES_DONE,
  GV_SORT_PROPERTIES,
} from './constants';


const defaultState = {
  requesting: null,
  list: [],
};

const sortList = (list, sortDescending) => {
  let min = list[0].rent;
  let max = 0;

  var sortedList = [];

  list.forEach(item => {
    if (item.rent < min) {
      min = item.rent;
      sortedList.splice(0, 0, item);
    } else if (item.rent >= max) {
      max = item.rent;
      sortedList.push(item);
    } else {
      for (let i = 1; i < sortedList.length; i++) {
        if (item.rent >= sortedList[i - 1].rent && item.rent < sortedList[i].rent) {
          sortedList.splice(i, 0, item);
          break;
        }
      }
    }
  })
  return sortDescending ? sortedList : sortedList.reverse();
}

export const GridView = (state = defaultState, action) => {
  switch (action.type) {

    case GV_SORT_PROPERTIES:
      return {
        ...state,
        list: sortList(state.list, action.payload.sortDescending),
      };

    case GV_REQUEST_NEXT_PROPERTIES:
      return {
        ...state,
        requesting: true,
      };

    case GV_REQUEST_NEXT_PROPERTIES_DONE:
      const list = action.payload.append ? [...state.list, ...action.payload.data] : action.payload.data;
      return {
        ...state,
        requesting: false,
        list: sortList(list, action.payload.sortDescending),
        total_count: action.payload.otherParams.total_count,
      };

    default:
      return state
  }
};
