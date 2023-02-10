//Type Key String Literals
const LOAD_SINGLE_BUSINESS_REVIEWS = "/api/getSingleBusinessReview"
const LOAD_SINGLE_REVIEW = "/api/getSingleReview"

//Redux action creators
const loadReviews = (payload) => {
    return {
        type: LOAD_SINGLE_BUSINESS_REVIEWS,
        payload
    }
}

const loadSingleReviewForEdit = (payload) => {
    return {
        type: LOAD_SINGLE_REVIEW,
        payload
    }
}


//Thunk action creators

//Get all Reviews based on a Business Id
export const loadSingleReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/businesses/${id}`)

    if (response.ok) {

        const review = await response.json();
        dispatch(loadReviews(review));
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

// Get Review Based on Id
export const loadReviewForEdit = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`)

    if (response.ok) {

        const review = await response.json();
        dispatch(loadSingleReviewForEdit(review));
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
const businessReviewsReducer = (state = initialState, action) => {
    let newState;
    let businessId;
    let reviewId;

    switch (action.type) {
        case LOAD_SINGLE_BUSINESS_REVIEWS:
            newState = {};

            businessId = action.payload.Reviews[0].business_id;
            newState[businessId] = []

            action.payload.Reviews.forEach((review, index) => {
                newState[businessId].push({ ...review });
                newState[businessId][index]['Owner'] = { ...review['Owner'] };
                newState[businessId][index]['Business'] = { ...review['Business'] };
                newState[businessId][index]['Images'] = [...review['Images']];

            })

            return newState;

        case LOAD_SINGLE_REVIEW:
            newState = {};

            reviewId = action.payload.id
            newState[reviewId] = { ...action.payload }
            newState[reviewId]['Owner'] = { ...action.payload['Owner'] };
            newState[reviewId]['Business'] = { ...action.payload['Business'] };
            newState[reviewId]['Images'] = [...action.payload['Images']];

            return newState;

        default:
            return state;
    }
}

export default businessReviewsReducer;