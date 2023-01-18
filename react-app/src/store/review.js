//Type Key String Literals
const LOAD_REVIEW_BY_BUSINESS_ID = "/api/getBusinessReviews";


//Redux action creators
const loadReviewsForBusiness = (payload) => {
    return {
        type: LOAD_REVIEW_BY_BUSINESS_ID,
        payload
    }
}


//Thunk action creators

// Get all Reviews based on Business Id
export const loadAllReviewsForBusiness = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/businesses/${id}`);

    if (response.ok) {

        const review = await response.json();
        dispatch(loadReviewsForBusiness(review));
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


//Initial State Object
const initialState = {};

//Redux Reducer
const reviewReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_REVIEW_BY_BUSINESS_ID:
            newState = { ...state }

            if (Object.keys(newState).length > 0) {

                Object.keys(state).forEach((businessId) => {
                    newState[businessId] = [...state[businessId]]

                    newState[businessId].forEach((review, index) => {
                        review['Owner'] = { ...state[businessId][index]['Owner'] };
                        review['Business'] = { ...state[businessId][index]['Business'] };
                        review['Images'] = [...state[businessId][index]['Images']];
                    });
                });

            };


            let businessId = action.payload.Reviews[0].business_id;
            newState[businessId] = []

            action.payload.Reviews.forEach((review, index) => {
                newState[businessId].push({ ...review });
                newState[businessId][index]['Owner'] = { ...review['Owner'] };
                newState[businessId][index]['Business'] = { ...review['Business'] };
                newState[businessId][index]['Images'] = [...review['Images']];

            })

            return newState;

        default:
            return state;
    }
}

export default reviewReducer;