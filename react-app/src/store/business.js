//Type Key String Literals
const LOAD_BUSINESSES = "/api/getBusinesses";
const LOAD_CURRENT_USER_BUSINESSES = "/api/getBusinessesByUser"
const CREATE_BUSINESS_BY_USER = "/api/createBusinessByUser"
const EDIT_BUSINESS = "/api/editBusinessByUser"



//Redux action creators
const loadBusinesses = (payload) => {
    return {
        type: LOAD_BUSINESSES,
        payload
    }
};

const loadUserBusinesses = (payload) => {
    return {
        type: LOAD_CURRENT_USER_BUSINESSES,
        payload
    }
}

const createBusiness = (payload) => {
    return {
        type: CREATE_BUSINESS_BY_USER,
        payload
    }
}

const editBusiness = (payload) => {
    return {
        type: EDIT_BUSINESS,
        payload
    }
}


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

// Get all Businesses based on Current Session User
export const loadAllBusinessesByUser = () => async (dispatch) => {
    const response = await fetch(`/api/businesses/mysession`)

    if (response.ok) {

        const businesses = await response.json();
        dispatch(loadUserBusinesses(businesses));
        return response;

    } else if (response.status < 500) {

        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {

        return ['An error occurred. Please try again.']

    }
}

// Create a Business 
export const createNewBusiness = (business) => async (dispatch) => {
    const response = await fetch(`/api/businesses/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(business)
    })


    if (response.ok) {

        const newBusiness = await response.json();
        dispatch(createBusiness(newBusiness))
        return newBusiness

    } else if (response.status < 500) {

        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {

        return ['An error occurred. Please try again.']

    }
}


// Edit a Business 
export const updateABusiness = (businessId, business) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(business)
    })


    if (response.ok) {

        const updatedBusiness = await response.json();
        dispatch(editBusiness(updatedBusiness))
        return updatedBusiness

    } else if (response.status < 500) {

        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {

        return ['An error occurred. Please try again.']

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

        case LOAD_CURRENT_USER_BUSINESSES:
            newState = {}

            action?.payload?.Businesses?.forEach((business) => {
                newState[business?.id] = { ...business };
                newState[business?.id]['Images'] = [...business?.Images]
            });

            return newState;

        case CREATE_BUSINESS_BY_USER:
            newState = { ...state }

            if (Object.keys(newState).length > 0) {

                Object.keys(state)?.forEach((businessId) => {
                    newState[businessId] = { ...state[businessId] }
                    newState[businessId]['Images'] = [...state[businessId]['Images']]
                });

            };

            newState[action.payload.id] = { ...action.payload }
            newState[action.payload.id]['Images'] = [...action.payload['Images']]

            return newState;

            case EDIT_BUSINESS:
                newState = { ...state }
    
                if (Object.keys(newState).length > 0) {
    
                    Object.keys(state)?.forEach((businessId) => {
                        newState[businessId] = { ...state[businessId] }
                        newState[businessId]['Images'] = [...state[businessId]['Images']]
                    });
    
                };
    
                newState[action.payload.id] = { ...action.payload }
                newState[action.payload.id]['Images'] = [...action.payload['Images']]
    
                return newState;

        default:
            return state;
    }
}

export default businessReducer;