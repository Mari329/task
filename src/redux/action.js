export const STORE_LOGIN_DETAILS = "STORE_LOGIN_DETAILS"

export function storeLoginDetails(payload) {
    return {
        type: STORE_LOGIN_DETAILS,
        payload: payload
    }
}