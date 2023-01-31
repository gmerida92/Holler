//Type Key String Literals
const LOAD_HOUR = "/api/getSingleBusinessHour";


//Redux action creators
const loadHour = (payload) => {
    return {
        type: LOAD_HOUR,
        payload
    }
}


//Thunk action creators

// Get Business Attribute based on a Business Id
export const loadSingleBusinessHour = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesshours/businesses/${id}`)

    if (response?.ok) {

        const businessHour = await response?.json();
        dispatch(loadHour(businessHour))
        return response;

    } else if (response?.status < 500) {

        const data = await response?.json();
        if (data?.errors) {
            return data?.errors;
        }

    } else {

        return ['An error occurred. Please try again.'];

    }
}


//Initial State Object
const initialState = {};


//Redux Reducer
const hourReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_HOUR:
            newState = {};

            let businessId = action.payload['Business Hours'][0].business_id;
            newState[businessId] = []

            action.payload['Business Hours'].forEach((businessHour) => {
                newState[businessId].push({ ...businessHour })
            });
            return newState;

        default:
            return state;
    }
}

export default hourReducer;