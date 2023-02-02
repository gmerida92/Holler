//Type Key String Literals
const LOAD_BUSINESS_ATTRIBUTES = "/api/getBusinessAttribute";
// const LOAD_USER_BUSINESS_ATTRIBUTES = "/api/getUserBusinessAttribute"


//Redux action creators
const loadBusinessAttribute = (payload) => {
    return {
        type: LOAD_BUSINESS_ATTRIBUTES,
        payload
    }
}

// const loadUserBusinessAttribut = (payload) => {
//     return {
//         type: LOAD_USER_BUSINESS_ATTRIBUTES,
//         payload
//     }
// }


//Thunk action creators

// Get Business Attribute based on a Business Id
export const loadAllBusinessAttribute = (id) => async (dispatch) => {
    const response = await fetch(`/api/businessattributes/businesses/${id}`)

    if (response?.ok) {

        const businessAttribute = await response?.json();
        dispatch(loadBusinessAttribute(businessAttribute))
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


// // Get Business Attribute of a User Business based on a Business Id
// export const loadAttributesUserBusiness = (id) => async (dispatch) => {
//     const response = await fetch(`/api/businessattributes/businesses/${id}`)

//     if (response?.ok) {

//         const businessAttribute = await response?.json();
//         dispatch(loadBusinessAttribute(businessAttribute))
//         return response;

//     } else if (response?.status < 500) {

//         const data = await response?.json();
//         if (data?.errors) {
//             return data?.errors;
//         }

//     } else {

//         return ['An error occurred. Please try again.'];

//     }
// }

//Initial State Object
const initialState = {};


//Redux Reducer
const businessAttributeReducer = (state = initialState, action) => {
    let newState;
    // let businessId;

    switch (action.type) {
        case LOAD_BUSINESS_ATTRIBUTES:
            newState = { ...state };

            if (Object.keys(newState).length > 0) {

                Object.keys(state)?.forEach((businessId) => {
                    newState[businessId] = { ...state[businessId] }

                });

            };

            newState[action?.payload?.business_id] = { ...action?.payload };
            return newState;

        // case LOAD_USER_BUSINESS_ATTRIBUTES:
        //     newState = { ...state };
        //     businessId = action?.payload?.business_id;

        //     if (Object.keys(newState).length > 0) {
        //         if (!state[businessId]) {
        //             newState[businessId] = { ...action?.payload };
        //         }
        //     }

        //     // newState[businessId] = { ...action?.payload };
        //     return newState

        default:
            return state;
    }
}

export default businessAttributeReducer;