//Type Key String Literals
const LOAD_BUSINESS_HOURS = "/api/getBusinessHour";
const CREATE_BUSINESS_HOURS = "/api/createBusinessHour";

//Redux action creators
const loadBusinessHour = (payload) => {
    return {
        type: LOAD_BUSINESS_HOURS,
        payload
    }
}

const createBusinessHours = (payload) => {
    return {
        type: CREATE_BUSINESS_HOURS,
        payload
    }
}


//Thunk action creators

// Get Business Hour based on a Business Id
export const loadAllBusinessHour = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesshours/businesses/${id}`)

    if (response.ok) {

        const businessHour = await response.json();
        dispatch(loadBusinessHour(businessHour))
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

// Create Business Hours based on Business Id
export const createHoursForBusiness = (businessId, newHour) => async(dispatch) => {
    console.log("HERE3", businessId, newHour)
    const response = await fetch(`/api/businesshours/businesses/${businessId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newHour)
    })

    console.log("HERE4", response)

    if (response.ok) {

        const businessHour = await response.json();
        console.log("HERE5", businessHour)
        dispatch(createBusinessHours(businessHour))
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
const businessHourReducer = (state = initialState, action) => {
    let newState;
    let businessId;

    switch (action.type) {
        case LOAD_BUSINESS_HOURS:
            newState = { ...state }

            if (Object.keys(newState).length > 0) {

                Object.keys(state).forEach((businessId) => {
                    newState[businessId] = [...state[businessId]]
                });

            };


            businessId = action.payload['Business Hours'][0].business_id;
            newState[businessId] = []

            action.payload['Business Hours'].forEach((businessHour) => {
                newState[businessId].push({ ...businessHour })
            });
            return newState;

        case CREATE_BUSINESS_HOURS:
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
};

export default businessHourReducer;