//Type Key String Literals
const LOAD_BUSINESS_ATTRIBUTES = "/api/getBusinessAttribute";


//Redux action creators
const loadBusinessAttribute = (payload) => {
    return {
        type: LOAD_BUSINESS_ATTRIBUTES,
        payload
    }
}

//Thunk action creators

// Get Business Attribute based on a Business Id
export const loadAllBusinessAttribute = (id) => async (dispatch) => {
    const response = await fetch(`/api/businessattributes/businesses/${id}`)

    if (response.ok) {

        const businessAttribute = await response.json();
        dispatch(loadBusinessAttribute(businessAttribute))
        return response;

    } else if (response.status < 500) {

        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {

        return ['An error occurred. Please try again'];

    }


}


//Initial State Object
const initialState = {};


//Redux Reducer
const businessAttributeReducer = (state = initialState, action) => {
    let newState = { ...state }
    Object.values(state).forEach((business) => {
        newState[business.id] = { ...business }

    })

    switch (action.type) {
        case LOAD_BUSINESS_ATTRIBUTES:

            newState[action.payload.id] = { ...action.payload };
            return newState;

        default:
            return state;
    }
}

export default businessAttributeReducer;