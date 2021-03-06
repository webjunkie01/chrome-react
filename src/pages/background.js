/* global chrome */
import { wrapStore, alias } from 'react-chrome-redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import {combineReducers, createStore, compose, applyMiddleware } from 'redux';
import {IndexReducer} from './reducers'
import IndexSagas from './sagas'
import {TOKENS} from './constants'


const middlewares = []


const logger = createLogger({
  collapsed: true,
})


if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware()


export const store = createStore(
    IndexReducer,
    applyMiddleware(sagaMiddleware,...middlewares)
)


sagaMiddleware.run(IndexSagas)

wrapStore(store, {
  portName: TOKENS,

})

export default store

