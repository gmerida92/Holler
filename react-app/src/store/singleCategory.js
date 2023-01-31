//Type Key String Literals
const LOAD_CATEGORY = "/api/getSingleBusinessCategory";


//Redux action creators
const loadCategory = (payload) => {
    return {
        type: LOAD_CATEGORY,
        payload
    }
}


//Thunk action creators

//Get Business Category based on a Business Id
export const loadSingleBusinessCategory = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesscategories/businesses/${id}`)

    if (response.ok) {

        const businessCategory = await response.json();
        dispatch(loadCategory(businessCategory));
        return response;

    } else if (response.status < 500) {

        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {

        return ['An error occurred. Please try again.'];

    }
}


//Initial State Object
const initialState = {};


//Redux Reducer
const categoryReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_CATEGORY:
            newState = {}

            let businessId = action.payload['Business Categories'][0].business_id;
            newState[businessId] = [];

            action.payload['Business Categories'].forEach((businessCategory) => {
                newState[businessId].push({ ...businessCategory })
            });
            return newState;

        default:
            return state;
    }
}

export default categoryReducer;