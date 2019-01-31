import {
  FETCH_TOKENS,
  SET_DATA,
  FETCH_SUCCESS,
  FETCH_ERROR,

} from '../constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  tokens: [],
}

const reducer = function loginReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_TOKENS:
        return {
          ...state,
          requesting: true,

        }
      case FETCH_SUCCESS:
        return {
          requesting: false,
          successful: true,
          errors: [],
          tokens: action.data
        }
      case FETCH_ERROR:
        return {
          successful: false,
          errors: action.message.toString(),
          requesting: false,
          tokens: null,
          messages: [],
        }

      default:
            return state
    }
  }

export default reducer
