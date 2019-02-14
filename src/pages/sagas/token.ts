import {  call, put, apply, select, takeEvery, all} from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {SET_DATA,FETCH_ERROR,FETCH_TOKENS, FETCH_SUCCESS} from '../constants'


const topTokensURL = `${process.env.REACT_APP_API_URL}/getTop?apiKey=${process.env.REACT_APP_API_KEY}&limit=10`



function loadTopTokensAPI() {
    return fetch(topTokensURL, {
        method: 'GET',

      })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(function(res:any){
        if (res.status === "error") {
            var error = new Error(res.message)
            //error.response = res.message
            throw error
        }
        return res
    })
    .catch((error) => { throw error })
}

function* loadTopTokens(){
    const response = yield call(loadTopTokensAPI)
    if (response.tokens.length > 0) {
        yield put({type: FETCH_SUCCESS, data: response.tokens})
    }else{
        yield put({type: FETCH_ERROR, payload: {'message': response.message} })
    }
}

function* tokensWatcher(){
    yield all([
        takeEvery(FETCH_TOKENS, loadTopTokens),
        ])

}

export default tokensWatcher


