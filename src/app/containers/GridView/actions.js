import {
  GV_REQUEST_NEXT_PROPERTIES,
  GV_REQUEST_NEXT_PROPERTIES_DONE,
  GV_SORT_PROPERTIES,
} from './constants';

export const requestNextProperties = (payload) => ({
  type: GV_REQUEST_NEXT_PROPERTIES,
  payload,
});

export const requestNextPropertiesDone = (payload) => ({
  type: GV_REQUEST_NEXT_PROPERTIES_DONE,
  payload,
});

export const sortProperties = (payload) => ({
  type: GV_SORT_PROPERTIES,
  payload,
});