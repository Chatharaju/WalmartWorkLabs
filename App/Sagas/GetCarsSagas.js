import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import GetCarsActions from '../Redux/GetCarsRedux'

export function * getCarsSagas (api, action) {
  console.tron.log("resprpps.getCarsSagas")
  // const {} = action
  // make the call to the api but for now making through Fixtures
  const response = yield call(api.getCars)
  console.tron.log("resprpps.response", api.getCars)
  if (response.ok) {
    console.tron.log("resprpps.cara", response.data)
    // do data conversion here if needed
    yield put(GetCarsActions.getCarsSuccess(response.data))
  } else {
    yield put(GetCarsActions.getCarsFailure())
  }
}
