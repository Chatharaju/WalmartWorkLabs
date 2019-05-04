import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCarsRequest: [],
  getCarsSuccess: ["cars"],
  getCarsFailure: null
})

export const GetCarsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  cars: null
})

/* ------------- Selectors ------------- */

export const GithubSelectors = {
  selectCars: state => state.getCars.cars
}

/* ------------- Reducers ------------- */

// request the cars for a user
export const request = (state, {}) => {
  console.tron.log("Redux Request")
  state.merge({ fetching: true })
}

// successful cars lookup
export const success = (state, action) => {
  const { cars } = action
  return state.merge({ fetching: false, error: null, cars })
}

// failed to get the cars
export const failure = (state) =>
  state.merge({ fetching: false, error: true, cars: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CARS_REQUEST]: request,
  [Types.GET_CARS_SUCCESS]: success,
  [Types.GET_CARS_FAILURE]: failure
})
