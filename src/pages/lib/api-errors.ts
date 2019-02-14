
export interface APIError {
    ok: string
}

export function handleApiErrors(response:any) {
    console.log(response,typeof(response))

    if (!response.ok) {
      throw Error(response.message)
    }

    return response

}