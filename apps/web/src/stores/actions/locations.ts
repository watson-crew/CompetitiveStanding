import { getApiInstance } from '@src/context/ApiContext'

// ACTION CREATOR - TODO: Refactor
const client = getApiInstance();
export function fetchLocations() {
    // TODO: Add correct types
    return async (dispatch: any) => {
        const data = (await client.location.getAllLocations()).data
        dispatch(setLocations(data))
    }
}
// TODO: Correct types
export function setLocations(data: any) {
    return {
        type: 'set_locations',
        payload: data
    }
}