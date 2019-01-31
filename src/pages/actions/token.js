import {FETCH_TOKENS} from '../constants'

export function fetchTokens() {
    console.log("action fetch toks")
    return {
        type: FETCH_TOKENS,
    }
}