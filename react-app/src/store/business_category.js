//Type Key String Literals
const LOAD_BUSINESS_CATEGORY = "/api/getBusinessCategory";
const CREATE_BUSINESS_CATEGORY = "/api/createBusinessCategory";
const EDIT_BUSINESS_CATEGORY = "/api/editBusinessCategory";

//Redux action creators
const loadBusinessCategory = (payload) => {
    return {
        type: LOAD_BUSINESS_CATEGORY,
        payload
    }
}

const createBusinessCategory = (payload) => {
    return {
        type: CREATE_BUSINESS_CATEGORY,
        payload
    }
}

const editBusinessCategory = (payload) => {
    return {
        type: CREATE_BUSINESS_CATEGORY,
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

// Create Business Category based on Business Id
export const createCategoryForBusiness = (businessId, newCategory) => async (dispatch) => {
    const response = await fetch(`/api/businesscategories/businesses/${businessId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
    })

    if (response.ok) {

        const businessCategory = await response.json();
        dispatch(createBusinessCategory(businessCategory));
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

// Edit Business Category based on Business Id
export const updateCategoryForBusiness = (businessCategoryId, businessId, category) => async (dispatch) => {
    const response = await fetch(`/api/businesscategories/${businessCategoryId}/businesses/${businessId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })

    if (response.ok) {

        const businessCategory = await response.json();
        dispatch(editBusinessCategory(businessCategory));
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
    let newState;
    let businessId;

    switch (action.type) {
        case LOAD_BUSINESS_CATEGORY:
            newState = { ...state }

            if (Object.keys(newState).length > 0) {

                Object.keys(state).forEach((businessId) => {
                    newState[businessId] = [...state[businessId]]
                });

            };

            businessId = action.payload['Business Categories'][0].business_id;
            newState[businessId] = [];

            action.payload['Business Categories'].forEach((businessCategory) => {
                newState[businessId].push({ ...businessCategory })
            });
            return newState;

        case CREATE_BUSINESS_CATEGORY:
            newState = { ...state }

            if (Object.keys(newState).length > 0) {

                Object.keys(state).forEach((businessId) => {
                    newState[businessId] = [...state[businessId]]
                });

            };

            businessId = action.payload.business_id;

            if (!(`${businessId}` in newState)) {
                newState[businessId] = [];
                newState[businessId].push({ ...action.payload })
            } else {
                newState[businessId].push({ ...action.payload })
            }

            return newState;

            case EDIT_BUSINESS_CATEGORY:
                newState = { ...state }
    
                if (Object.keys(newState).length > 0) {
    
                    Object.keys(state).forEach((businessId) => {
                        newState[businessId] = [...state[businessId]]
                    });
    
                };
    
                businessId = action.payload.business_id;
    
                if (!(`${businessId}` in newState)) {
                    newState[businessId] = [];
                    newState[businessId].push({ ...action.payload })
                } else {
                    newState[businessId].push({ ...action.payload })
                }
    
                return newState;

        default:
            return state;
    }
}

export default businessCategoryReducer;