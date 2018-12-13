import {
  GV_REQUEST_NEXT_PROPERTIES,
  GV_REQUEST_NEXT_PROPERTIES_DONE,
  GV_SORT_PROPERTIES,
} from './constants';


const defaultState = {
  requesting: null,
  list: [],
};

const sortList = (list, sort) => {

  let key = '';
  switch (Object.keys(sort)[0]) {
    case 'rent': key = 'rent'; break;
    case 'size': key = 'propertySize'; break;
    case 'date': key = 'creationDate'; break;
    default: key = '';
  }

  if (!key) return list;

  let min = list[0][key];
  let max = 0;

  var sortedList = [];

  list.forEach(item => {
    if (item[key] < min) {
      min = item[key];
      sortedList.splice(0, 0, item);
    } else if (item[key] >= max) {
      max = item[key];
      sortedList.push(item);
    } else {
      for (let i = 1; i < sortedList.length; i++) {
        if (item[key] >= sortedList[i - 1][key] && item[key] < sortedList[i][key]) {
          sortedList.splice(i, 0, item);
          break;
        }
      }
    }
  })
  // return sortedList;
  return sort[Object.keys(sort)[0]] ? sortedList : sortedList.reverse();
}

export const GridView = (state = defaultState, action) => {
  switch (action.type) {

    case GV_SORT_PROPERTIES:
      return {
        ...state,
        list: sortList(state.list, action.payload.sort),
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
        list: sortList(list, action.payload.sort),
        total_count: action.payload.otherParams.total_count,
      };

    default:
      return state
  }
};
