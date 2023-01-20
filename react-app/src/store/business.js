//Type Key String Literals
const LOAD_BUSINESSES = "/api/getBusinesses";



//Redux action creators
const loadBusinesses = (payload) => {
    return {
        type: LOAD_BUSINESSES,
        payload
    }
};


//Thunk action creators

// Get all Businesses
export const loadAllBusinesses = () => async (dispatch) => {
    const response = await fetch(`/api/businesses/`);

    if (response?.ok) {

        const businesses = await response?.json();
        dispatch(loadBusinesses(businesses));
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
const businessReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BUSINESSES:
            newState = {}

            action?.payload?.Businesses?.forEach((business) => {
                newState[business?.id] = { ...business };
                newState[business?.id]['Images'] = [...business?.Images]
            });
            return newState;

        default:
            return state;
    }
}

export default businessReducer;