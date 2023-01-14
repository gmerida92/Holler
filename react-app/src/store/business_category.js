//Type Key String Literals
const LOAD_BUSINESS_CATEGORY = "/api/getBusinessCategory";


//Redux action creators
const loadBusinessCategory = (payload) => {
    return {
        type: LOAD_BUSINESS_CATEGORY,
        payload
    }
}


//Thunk action creators

//Get Business Category based on a Business Id
export const loadAllBusinessCategory = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesscategories/businesses/${id}`)

    if (response.ok) {

        const businessCategory = await response.json();
        dispatch(loadBusinessCategory(businessCategory));
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
const businessCategoryReducer = (state = initialState, action) => {
    let newState = { ...state }
    Object.values(state).forEach((business) => {
        newState[business.id] = {...business}

    })
    
    switch (action.type) {
        case LOAD_BUSINESS_CATEGORY:

            action.payload['Business Categories'].forEach((businessCategory) => {
                newState[businessCategory.id] = { ...businessCategory }
            });
            return newState;

        default:
            return state;
    }
}

export default businessCategoryReducer;