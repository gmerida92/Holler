//Type Key String Literals
const LOAD_REVIEW_BY_BUSINESS_ID = "/api/getBusinessReviews";
const LOAD_CURRENT_USER_REVIEWS = "/api/getReviewsByUser"
const CREATE_REVIEW_FOR_BUSINESS = "/apit/createReview"
const EDIT_REVIEW_FOR_BUSINESS = "/apit/createReview"


//Redux action creators
const loadReviewsForBusiness = (payload) => {
    return {
        type: LOAD_REVIEW_BY_BUSINESS_ID,
        payload
    }
}

const loadUserReviews = (payload) => {
    return {
        type: LOAD_CURRENT_USER_REVIEWS,
        payload
    }
}

const createReview = (payload) => {
    return {
        type: CREATE_REVIEW_FOR_BUSINESS,
        payload
    }
}

const editReview = (payload) => {
    return {
        type: EDIT_REVIEW_FOR_BUSINESS,
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

// Get all Reviews based on Current Session User
export const loadAllReviewsByUser = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/mysession`);

    if (response.ok) {

        const review = await response.json();
        dispatch(loadUserReviews(review));
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

// Create Review based on the Business Id
export const createNewReview = (businessId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/businesses/${businessId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {

        // const newReview = await response.json();
        // dispatch(createReview(newReview));
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

// Edit Review
export const updateAReview = (id, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {

        // const updatedReview = await response.json();
        // dispatch(editReview(updateReview));
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
    let businessId;
    let userId;

    switch (action.type) {
        case LOAD_REVIEW_BY_BUSINESS_ID:
            newState = { ...state }
            // newState ={}

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


            businessId = action.payload.Reviews[0].business_id;
            newState[businessId] = []

            action.payload.Reviews.forEach((review, index) => {
                newState[businessId].push({ ...review });
                newState[businessId][index]['Owner'] = { ...review['Owner'] };
                newState[businessId][index]['Business'] = { ...review['Business'] };
                newState[businessId][index]['Images'] = [...review['Images']];

            })

            return newState;

        case LOAD_CURRENT_USER_REVIEWS:
            newState = {};

            userId = action.payload.Reviews[0].Owner.id;
            newState[userId] = []

            action.payload.Reviews.forEach((review, index) => {
                newState[userId].push({ ...review });
                newState[userId][index]['Owner'] = { ...review['Owner'] };
                newState[userId][index]['Business'] = { ...review['Business'] };
                newState[userId][index]['Images'] = [...review['Images']];

            })

            return newState;

        // case CREATE_REVIEW_FOR_BUSINESS:
        // case EDIT_REVIEW_FOR_BUSINESS:


        default:
            return state;
    }
}

export default reviewReducer;