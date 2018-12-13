import { FL_UPDATE_FILTER, FL_RESET } from './constants';

export const updateFilter = (payload) => ({
  type: FL_UPDATE_FILTER,
  payload,
})

export const reset = (payload) => ({
  type: FL_RESET,
  payload,
})
