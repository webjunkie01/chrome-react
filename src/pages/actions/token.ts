import {FETCH_TOKENS} from '../constants/index'


export interface FetchTokens {
    type: string
}

export function fetchTokens():FetchTokens {
    console.log("action fetch toks")
    return {
        type: FETCH_TOKENS,
    }
}
