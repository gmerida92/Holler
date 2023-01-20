//Type Key String Literals
const LOAD_SINGLE_BUSINESS = "/api/getSingleBusinessDetail";


//Redux action creators
const loadBusiness = (payload) => {
    return {
        type: LOAD_SINGLE_BUSINESS,
        payload
    }
}


//Thunk action creators

// Get Business based on Business Id
export const loadSingleBusiness = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${id}`);

    if (response?.ok) {

        const business = await response?.json();
        dispatch(loadBusiness(business));
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
const singleBusinessDetailReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SINGLE_BUSINESS:
            newState = {};

            newState[action.payload.id] = { ...action.payload };
            newState[action.payload.id]['Owner'] = { ...action.payload.Owner };
            newState[action.payload.id]['Images'] = [...action.payload.Images];
            return newState;

        default:
            return state;
    }
}

export default singleBusinessDetailReducer;