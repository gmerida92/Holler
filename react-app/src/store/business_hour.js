//Type Key String Literals
const LOAD_BUSINESS_HOURS = "/api/getBusinessHour";


//Redux action creators
const loadBusinessHour = (payload) => {
    return {
        type: LOAD_BUSINESS_HOURS,
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


//Initial State Object
const initialState = {};


//Redux Reducer
const businessHourReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BUSINESS_HOURS:
            newState = { ...state }

            if (Object.keys(newState).length > 0) {

                Object.keys(state).forEach((businessId) => {
                    newState[businessId] = [...state[businessId]]
                });

            };


            let businessId = action.payload['Business Hours'][0].business_id;
            newState[businessId] = []

            action.payload['Business Hours'].forEach((businessHour) => {
                newState[businessId].push({ ...businessHour })
            });
            return newState;

        default:
            return state;
    }
};

export default businessHourReducer;