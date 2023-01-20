//Type Key String Literals
const LOAD_SINGLE_ATTRIBUTE = "/api/getBusinessAttribute";


//Redux action creators
const loadAttribute = (payload) => {
    return {
        type: LOAD_SINGLE_ATTRIBUTES,
        payload
    }
}


//Thunk action creators

// Get Business Attribute based on a Business Id
export const loadSingleAttribute = (id) => async (dispatch) => {
    const response = await fetch(`/api/businessattributes/businesses/${id}`)

    if (response?.ok) {

        const businessAttribute = await response?.json();
        dispatch(loadAttribute(businessAttribute))
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
const businessAttributeReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SINGLE_ATTRIBUTE:
            newState = {};

            newState[action.payload.business_id] = { ...action.payload };
            return newState;

        default:
            return state;
    }
}

export default businessAttributeReducer;