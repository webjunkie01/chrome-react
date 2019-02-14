import {all} from 'redux-saga/effects'
import token from './token'

export default function* IndexSaga() {
    yield all([
        token(),
        ])
}

